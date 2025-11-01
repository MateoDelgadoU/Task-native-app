import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';

import { Todo } from '@/types/types';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';


export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: inputText,
          completed: false
        }
      ]);
      setInputText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      <Header
        completedCount={completedCount}
        totalCount={totalCount}
        onStatsPress={() => setStatsVisible(true)}
      />

      <TodoInput
        value={inputText}
        onChangeText={setInputText}
        onSubmit={addTodo}
      />

      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <StatsCard
        visible={statsVisible}
        onClose={() => setStatsVisible(false)}
        totalTasks={totalCount}
        completedTasks={completedCount}
        pendingTasks={pendingCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },
  listContent: {
    padding: 20,
    paddingTop: 0
  }
});