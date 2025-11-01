import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyState() {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>□</Text>
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Add one to get started</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
        color: '#d1d5db'
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: 8
    },
    emptySubtext: {
        fontSize: 16,
        color: '#9ca3af'
    }
});