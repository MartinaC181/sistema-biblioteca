import React from 'react';

function Alert({ message, type }) {
  if (!message) {
    return null;
  }

  // Define la clase de Bootstrap según el tipo de alerta ('success' o 'danger')
  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
}

export default Alert;