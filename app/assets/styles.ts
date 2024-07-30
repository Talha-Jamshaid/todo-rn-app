import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    header: {
      backgroundColor: "#007bff",
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "bold",
    },
    inputContainer: {
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 10,
      marginRight: 10,
      backgroundColor: "#fff",
    },
    addButton: {
      backgroundColor: "#007bff",
      padding: 10,
      borderRadius: 4,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    todoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    todoContent: {
      flex: 1,
    },
    todoTask: {
      fontSize: 16,
      flex: 1,
    },
    completedTodo: {
      textDecorationLine: "line-through",
      color: "#6c757d",
    },
    todoActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    editButton: {
      color: "#007bff",
      marginRight: 15,
      fontWeight: "bold",
    },
    deleteButton: {
      color: "#ff4d4d",
      fontWeight: "bold",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#666',
    },
  });