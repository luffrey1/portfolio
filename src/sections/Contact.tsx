"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { initEmailJS } from "@/lib/emailjs";
import MiniParticles from "@/components/MiniParticles";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [emailSent, setEmailSent] = useState(false);
  const [emailJSInitialized, setEmailJSInitialized] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    try {
      initEmailJS();
      setEmailJSInitialized(true);
      console.log("EmailJS initialized successfully");
    } catch (error) {
      console.error("Error initializing EmailJS:", error);
      toast.error("Error al inicializar el sistema de contacto");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "El nombre es obligatorio";
    }
    
    if (!formData.email.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Email inválido";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "El asunto es obligatorio";
    }
    
    if (!formData.message.trim()) {
      errors.message = "El mensaje es obligatorio";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, completa todos los campos correctamente");
      return;
    }
    
    if (!emailJSInitialized) {
      toast.error("El sistema de contacto no está disponible en este momento");
      return;
    }
    
    setLoading(true);
    
    // Comprobar si existen las variables de entorno necesarias
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    
    if (!serviceId || !templateId || !userId) {
      console.error("Missing EmailJS environment variables");
      toast.error("Error de configuración del formulario de contacto");
      setLoading(false);
      return;
    }
    
    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        userId
      );
      
      console.log("Email sent successfully:", result);
      toast.custom((t) => (
        <div className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-glass-dark shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <FaCheckCircle className="h-10 w-10 text-accent-green animate-pulse" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-accent-green">
                  ¡Mensaje enviado con éxito!
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Gracias por contactar. Te responderé lo antes posible.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-700">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-accent-green hover:text-accent-blue focus:outline-none"
            >
              Cerrar
            </button>
          </div>
        </div>
      ), { duration: 5000 });
      
      setEmailSent(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Restablecer el estado después de un tiempo
      setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Particles Background */}
      <MiniParticles variant="purple" className="opacity-60" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-36 h-36 rounded-full bg-accent-purple/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-44 h-44 rounded-full bg-accent-blue/10 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-28 h-28 rounded-full bg-accent-purple/20 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-accent-blue/20 blur-2xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">
            Contacto
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            ¿Tienes un proyecto en mente? <span className="text-accent-purple font-semibold">¡Hablemos! (no funcional)</span>
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="glassmorphism rounded-3xl p-6 h-full border border-transparent hover:border-accent-purple/30 transition-all duration-300">
                <h3 className="text-xl font-bold mb-6 text-accent-purple">
                  Información de Contacto
                </h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-accent-purple/10 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-accent-purple w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:danielghcu@gmail.com" 
                        className="text-accent-purple hover:underline"
                        onMouseEnter={(e) => {
                          e.currentTarget.classList.add("animate-pulse");
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.classList.remove("animate-pulse");
                        }}
                      >
                        danielghcu@gmail.com
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-accent-purple/10 p-3 rounded-full mr-4">
                      <FaPhone className="text-accent-purple w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium mb-1">Teléfono</h4>
                      <a 
                        href="tel:+34 691561850" 
                        className="text-accent-purple hover:underline"
                        onMouseEnter={(e) => {
                          e.currentTarget.classList.add("animate-pulse");
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.classList.remove("animate-pulse");
                        }}
                      >
                        +34 691561850
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-accent-purple/10 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-accent-purple w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium mb-1">Ubicación</h4>
                      <p className="text-gray-400">
                        Madrid, España
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="md:col-span-2"
            >
              <div className="glassmorphism rounded-3xl p-6 border border-transparent hover:border-accent-blue/30 transition-all duration-300">
                <h3 className="text-xl font-bold mb-6 text-accent-purple">
                  Envíame un mensaje
                </h3>
                
                {emailSent ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <FaCheckCircle className="w-16 h-16 mx-auto text-accent-green mb-4" />
                    <h4 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h4>
                    <p className="text-gray-300">Gracias por contactar conmigo. Te responderé lo antes posible.</p>
                    <motion.button
                      onClick={() => setEmailSent(false)}
                      className="mt-6 px-6 py-2 rounded-xl bg-glass-dark text-accent-blue border border-accent-blue/30 hover:border-accent-blue"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Enviar otro mensaje
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <motion.div variants={itemVariants}>
                        <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-glass-dark rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300 ${
                            formErrors.name ? "border border-red-500" : "border border-transparent hover:border-accent-purple/30"
                          }`}
                          placeholder="Tu nombre"
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-glass-dark rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300 ${
                            formErrors.email ? "border border-red-500" : "border border-transparent hover:border-accent-purple/30"
                          }`}
                          placeholder="Tu email"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </motion.div>
                    </div>
                    
                    <motion.div className="mb-6" variants={itemVariants}>
                      <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">
                        Asunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full bg-glass-dark rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300 ${
                          formErrors.subject ? "border border-red-500" : "border border-transparent hover:border-accent-purple/30"
                        }`}
                        placeholder="Asunto del mensaje"
                      />
                      {formErrors.subject && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
                      )}
                    </motion.div>
                    
                    <motion.div className="mb-6" variants={itemVariants}>
                      <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full bg-glass-dark rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300 ${
                          formErrors.message ? "border border-red-500" : "border border-transparent hover:border-accent-purple/30"
                        }`}
                        placeholder="Escribe tu mensaje aquí..."
                      />
                      {formErrors.message && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="text-center"
                      variants={itemVariants}
                    >
                      <motion.button
                        type="submit"
                        disabled={loading || !emailJSInitialized}
                        className={`px-8 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium inline-flex items-center justify-center ${
                          loading || !emailJSInitialized ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-accent-purple/20"
                        }`}
                        whileHover={loading || !emailJSInitialized ? {} : { scale: 1.03 }}
                        whileTap={loading || !emailJSInitialized ? {} : { scale: 0.97 }}
                      >
                        {loading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <FaPaperPlane className="mr-2 h-4 w-4" />
                        )}
                        {loading ? "Enviando..." : "Enviar Mensaje"}
                      </motion.button>
                      
                      {!emailJSInitialized && (
                        <p className="text-red-500 text-xs mt-2">
                          El sistema de contacto no está disponible en este momento.
                        </p>
                      )}
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 