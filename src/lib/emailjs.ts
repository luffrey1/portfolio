import { init } from 'emailjs-com';

/**
 * Inicializa el servicio EmailJS para el formulario de contacto
 * @returns {boolean} - true si la inicialización fue exitosa, false en caso contrario
 */
export const initEmailJS = (): boolean => {
  try {
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    
    // Verificar que todas las variables de entorno necesarias estén configuradas
    if (!userId || !serviceId || !templateId) {
      console.warn(
        "EmailJS configuration incomplete. The contact form will not function correctly. " +
        "Please set the following environment variables: " +
        "NEXT_PUBLIC_EMAILJS_USER_ID, NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID"
      );
      return false;
    }
    
    // Inicializar EmailJS con el ID de usuario
    init(userId);
    
    return true;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    return false;
  }
};

/**
 * Verifica si la configuración de EmailJS está completa
 * @returns {boolean} - true si todas las variables de entorno están configuradas, false en caso contrario
 */
export const isEmailJSConfigured = (): boolean => {
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  
  return Boolean(userId && serviceId && templateId);
}; 