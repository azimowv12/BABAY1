import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ email: '', message: '' });
    };

    return (
        <section className="text-gray-600 body-font relative">
            <div className="absolute inset-0 bg-gray-300">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="map"
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.9589006678316!2d64.5506318752856!3d39.731263671558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f501d8b091826f3%3A0xad6d7621a37218d3!2sBABAY%20FOOD!5e1!3m2!1sru!2s!4v1760638421437!5m2!1sru!2s"
                    style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
                ></iframe>
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                
            </div>
        </section>
    );
}