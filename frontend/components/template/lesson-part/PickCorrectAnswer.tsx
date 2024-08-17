import React, { FC, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { LessonPickCorrectAnswerDataType } from '~/types'

type PickCorrectAnswerProps = {
  data: LessonPickCorrectAnswerDataType
  onCorrect: () => void
  onWrong: () => void
}

export const PickCorrectAnswer = forwardRef(
  ({ data, onCorrect, onWrong }: PickCorrectAnswerProps, ref) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>()

    const handleAnswer = (answer: string) => {
      setSelectedAnswer(answer)
    }

    const isCorrect = selectedAnswer ? selectedAnswer === data.correctAnswer : undefined

    useEffect(() => {
      setSelectedAnswer(undefined)
    }, [data])

    useEffect(() => {
      if (isCorrect === undefined) return

      if (isCorrect) {
        onCorrect()
      } else {
        onWrong()
      }
    }, [isCorrect])

    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelectedAnswer(undefined)
      },
    }))

    const answers = useMemo(() => {
      return [data.correctAnswer, ...data.wrongAnswer].sort(() => Math.random() - 0.5)
    }, [data])

    return (
      <View style={styles.container}>
        <Text style={styles.question}>{data.question}</Text>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === answer && (isCorrect ? styles.correctAnswer : styles.wrongAnswer),
            ]}
            onPress={() => handleAnswer(answer)}
            disabled={!!selectedAnswer}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}

        {selectedAnswer && (
          <Text style={styles.resultText}>{isCorrect ? 'Chính xác!' : 'Sai rồi!'}</Text>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  answerButton: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
  },
  correctAnswer: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  wrongAnswer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
})
