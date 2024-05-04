import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

type SectionProps = {
    title: string;
};

function Section({ title, children }: PropsWithChildren<SectionProps>) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {
                children
                    ? <Text style={styles.sectionDescription}>{children}</Text>
                    : undefined
            }
        </View>
    );
}

export default Section;
