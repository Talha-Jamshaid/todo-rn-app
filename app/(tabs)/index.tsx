import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../assets/styles";
import axios from "axios";
import { API_URL } from "@/constants/Api";
import Checkbox from "@/components/Checkbox";
import { convertCompletedToBoolean, generateRandomString } from "@/constants/Helper";
import Cookies from "js-cookie";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todoTask, setTodoTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // For loading state


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(API_URL + "login", {
          username: generateRandomString(5),
          password: generateRandomString(5),
        },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []); // Only run once on mount
  console.log(user);
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL + "todos", {
        withCredentials: true, headers: {
          'Content-Type': 'application/json', // Example of setting Content-Type header
        },
      });
      const todos = response.data.data;
      setTodos(convertCompletedToBoolean(todos));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (!user) {
      return; // Don't fetch todos if token is not available
    }

    fetchTodos();
  }, [setUser, user]); // Depend on token

  const addOrEditTodo = async () => {
    if (todoTask.trim()) {
      try {
        if (editTodoId) {
          await axios.put(`${API_URL}todos/${editTodoId}`, {
            task: todoTask,
            completed: false,
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'text/plain', // Ensure the correct content type
            },
          });

          setTodos((prevTodos) =>
            prevTodos?.map((todo) =>
              todo.id === editTodoId
                ? { ...todo, task: todoTask, completed: false }
                : todo
            )
          );

          setEditTodoId(null);
        } else {
          const response = await axios.post(API_URL + "todos", {
            task: todoTask,
            completed: false,
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          response.data.success &&
            setTodos((prevTodos) => [...prevTodos, response.data.data]);
        }
        setTodoTask("");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while saving the todo.");
      }
    } else {
      Alert.alert("Validation Error", "Todo text cannot be empty.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}todos/${id}`, {
        withCredentials: true, headers: {
          'Content-Type': 'application/json', // Example of setting Content-Type header
        },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      Alert.alert("Todo Deleted Successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while deleting the todo.");
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        await axios.put(`${API_URL}todos/${id}`, {
          ...todo,
          completed: !todo.completed,
        },
          {
            withCredentials: true, headers: {
              'Content-Type': 'application/json', // Example of setting Content-Type header
            },
          }
        );
        setTodos((prevTodos) =>
          prevTodos?.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while updating the todo.");
    }
  };

  const startEditing = (todo: Todo) => {
    setTodoTask(todo.task);
    setEditTodoId(todo.id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer} testID="loading-spinner">
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todoTask}
          onChangeText={setTodoTask}
          placeholder={editTodoId ? "Edit todo" : "Add a new todo"}
          testID="inputField"
        />
        <TouchableOpacity style={styles.addButton} onPress={addOrEditTodo}>
          <Text style={styles.addButtonText}>
            {editTodoId ? "Save" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Checkbox
              checked={item.completed}
              onToggle={() => toggleComplete(item.id)}
            />
            <TouchableOpacity onPress={() => { }} style={styles.todoContent}>
              <Text
                style={[
                  styles.todoTask,
                  item.completed && styles.completedTodo,
                ]}
              >
                {item.task}
              </Text>
            </TouchableOpacity>
            <View style={styles.todoActions}>
              <TouchableOpacity onPress={() => startEditing(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text>Empty Todo List</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default App;
