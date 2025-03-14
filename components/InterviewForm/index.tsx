"use client";
import React, { useState } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [""],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index: number, value: string)  => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, '']
    });
  };

  const removeQuestion =  (index: number)  => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
        const questionData = {
            ...formData,
            createdAt: new Date()
        };

        const docRef = await addDoc(collection(db, 'questions'), questionData);

        setSuccessMessage(`Questions "${formData.title}" created successfully!`);
      console.log('Questions created with ID: ', docRef.id);

      setFormData({
        title: '',
        description: '',
        questions: ['']
      });
    } catch (err) {
        console.error("Error adding question: ", err);
        setError('Failed to create question. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }

  return (
    <div className='container'>
      <h1 className='title'>Create New Interview</h1>

      {successMessage && (
        <div className='success-message'>
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className='error-message'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <label htmlFor='title' className='labe'>
            Interview Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
            className='input-field'
            placeholder='Enter question title e.g: Frontend Developer Interview'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description' className='label'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='textarea'
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter question description e.g: A list of technical and behavioral questions for front-end roles.'
            rows={4}
          />
        </div>

        <div className='form-group'>
          <label className='label'>Questions</label>
          {formData.questions.map((question, index) => (
            <div key={index} className='question-container'>
              <input
                type='text'
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                required
                className='input'
                placeholder={`Question e.g: What is Javascript? ${index + 1}`}
              />
              {formData.questions.length > 1 && (
                <button
                  type='button'
                  onClick={() => removeQuestion(index)}
                  className='remove-button'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type='button'
            onClick={addQuestion}
            className='add-button'
          >
            + Add Question
          </button>
        </div>
        
        <button
          type='submit'
          className='submit-button'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Question'}
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;
