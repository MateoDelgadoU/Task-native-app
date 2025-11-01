import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { styles } from '@/styles/statsStyles';

interface StatsCardProps {
    visible: boolean;
    onClose: () => void;
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
}

const { height } = Dimensions.get('window');

export default function StatsCard({
    visible,
    onClose,
    totalTasks,
    completedTasks,
    pendingTasks
}: StatsCardProps) {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true
                }),
                Animated.timing(progressAnim, {
                    toValue: percentage,
                    duration: 1000,
                    delay: 300,
                    useNativeDriver: false
                })
            ]).start();

            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true
                })
            ).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: height,
                    duration: 250,
                    useNativeDriver: true
                })
            ]).start();
            progressAnim.setValue(0);
        }
    }, [visible, percentage]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%']
    });

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const getMotivationalText = () => {
        if (totalTasks === 0) return 'Start your journey';
        if (percentage === 100) return 'Amazing work!';
        if (percentage >= 75) return 'Almost there!';
        if (percentage >= 50) return 'Great progress!';
        if (percentage >= 25) return 'Keep going!';
        return 'You got this!';
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[styles.backdrop, { opacity: fadeAnim }]}
                >
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={onClose}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.modalContent,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <Text style={styles.title}>Progress Overview</Text>
                        <Animated.View style={[styles.badge, { transform: [{ rotate }] }]}>
                            <Text style={styles.badgeText}>★</Text>
                        </Animated.View>
                    </View>

                    <View style={styles.percentageContainer}>
                        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
                        <Text style={styles.motivationalText}>{getMotivationalText()}</Text>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBackground}>
                            <Animated.View
                                style={[
                                    styles.progressBarFill,
                                    { width: progressWidth }
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <View style={[styles.statIcon, styles.totalIcon]}>
                                <Text style={styles.statIconText}>☰</Text>
                            </View>
                            <Text style={styles.statNumber}>{totalTasks}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statItem}>
                            <View style={[styles.statIcon, styles.completedIcon]}>
                                <Text style={styles.statIconText}>✓</Text>
                            </View>
                            <Text style={styles.statNumber}>{completedTasks}</Text>
                            <Text style={styles.statLabel}>Done</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statItem}>
                            <View style={[styles.statIcon, styles.pendingIcon]}>
                                <Text style={styles.statIconText}>○</Text>
                            </View>
                            <Text style={styles.statNumber}>{pendingTasks}</Text>
                            <Text style={styles.statLabel}>Pending</Text>
                        </View>
                    </View>

                    <View style={styles.timeInfo}>
                        <Text style={styles.timeText}>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}