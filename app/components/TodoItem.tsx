import { Todo } from '@/types/types';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoItemProps {
    item: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
    const [scaleAnim] = useState(new Animated.Value(1));

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    };

    return (
        <Animated.View style={[styles.todoItem, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
                style={styles.todoContent}
                onPress={() => onToggle(item.id)}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
                    {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onDelete(item.id)}
                style={styles.deleteButton}
            >
                <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    todoItem: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3
    },
    todoContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#d1d5db',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxCompleted: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1'
    },
    checkmark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    todoText: {
        fontSize: 16,
        color: '#1f2937',
        flex: 1
    },
    todoTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#9ca3af'
    },
    deleteButton: {
        padding: 8
    },
    deleteText: {
        fontSize: 28,
        color: '#ef4444',
        fontWeight: '300'
    }
});