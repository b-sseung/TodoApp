import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import DateHead from './components/DateHead';
import Empty from './components/Empty';
import AppTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  const today: Date = new Date();

  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리스트 만들어보기', done: false},
  ]);

  const onInsert = (text: String) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const todo: any = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));
  };

  const onToggle = (id: number) => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = (id: number) => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AppTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  avoid: {flex: 1},
});

export default App;
