import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    completedCount: number;
    totalCount: number;
    onStatsPress: () => void;
}

export default function Header({ completedCount, totalCount, onStatsPress }: HeaderProps) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>My Tasks</Text>
                <Text style={styles.subtitle}>
                    {completedCount} of {totalCount} completed
                </Text>
            </View>
            <TouchableOpacity style={styles.statsButton} onPress={onStatsPress}>
                <Text style={styles.statsIcon}>📊</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6366f1',
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 16,
        color: '#e0e7ff',
        fontWeight: '500'
    },
    statsButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsIcon: {
        fontSize: 24
    }
});