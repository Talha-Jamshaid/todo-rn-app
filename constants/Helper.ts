export const convertCompletedToBoolean = (todos: any[]) => {
    return todos?.map(todo => ({
      ...todo,
      completed: todo.completed === 1, // Convert 1 to true and 0 to false
    }));
  };


  /**
 * Generates a random string of a given length using alphanumeric characters.
 * 
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A random string of the specified length.
 */
export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };