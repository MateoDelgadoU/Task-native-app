import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TodoInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
}

export default function TodoInput({ value, onChangeText, onSubmit }: TodoInputProps) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Add new task..."
                placeholderTextColor="#9ca3af"
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            <TouchableOpacity style={styles.addButton} onPress={onSubmit}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 12
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1f2937',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    addButton: {
        backgroundColor: '#6366f1',
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
    },
    addButtonText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300'
    }
});