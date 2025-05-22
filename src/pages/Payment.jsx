import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Payment.css";

const Payment = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    address: '',
    address2: '',
    city: '',
    state: 'Antioquia',
    zipCode: '',
    phone: ''
  });

  const [emailUpdates, setEmailUpdates] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('epayco');
  const [activeSection, setActiveSection] = useState('contact');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    const randomOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrderNum);
   
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
     
    }, 2000);
  };

  const returnToStore = () => {
    navigate('/all-books');
    

  };

  if (paymentSuccess) {
    return (
      <div className="payment-card">
        <div className="card-header">
          <h2>¡Pago Exitoso!</h2>
        </div>
        
        <div className="card-body">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Gracias por tu compra</h3>
            <p>Tu pago ha sido procesado exitosamente.</p>
            
            <div className="order-details">
              <p><strong>Número de orden:</strong> {orderNumber}</p>
              <p>Recibirás un correo de confirmación en: {formData.email}</p>
              <p>Dirección de envío: {formData.address}, {formData.city}</p>
            </div>
            
            <button 
              className="continue-shopping-btn"
              onClick={returnToStore}
            >
              Regresar al comercio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-card">
      <div className="card-header">
        <h2>Finalizar Compra</h2>
      </div>
      
      <div className="card-body">
        <div className="steps-nav">
          <button 
            className={`step-btn ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contacto
          </button>
          <button 
            className={`step-btn ${activeSection === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveSection('shipping')}
            disabled={!formData.email}
          >
            Envío
          </button>
          <button 
            className={`step-btn ${activeSection === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveSection('payment')}
            disabled={!formData.address || !formData.city}
          >
            Pago
          </button>
        </div>

        {isProcessing && (
          <div className="processing-overlay">
            <div className="processing-spinner"></div>
            <p>Procesando tu pago...</p>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="section-content">
            <div className="form-section">
              <label className="section-label">Correo electrónico</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="tucorreo@ejemplo.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="emailUpdates" 
                  checked={emailUpdates} 
                  onChange={() => setEmailUpdates(!emailUpdates)} 
                />
                <label htmlFor="emailUpdates">Enviarme novedades y ofertas por correo electrónico</label>
              </div>
            </div>
            
            <div className="section-footer">
              <button 
                className="next-btn" 
                onClick={() => setActiveSection('shipping')}
                disabled={!formData.email}
              >
                Continuar al envío
              </button>
            </div>
          </div>
        )}

        {activeSection === 'shipping' && (
          <div className="section-content">
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>País / Región</label>
                  <div className="select-wrapper">
                    <select className="form-input" disabled>
                      <option>Colombia</option>
                    </select>
                    <span className="checkmark">✔</span>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input 
                    type="text" 
                    className="form-input"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input 
                    type="text" 
                    className="form-input"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cédula</label>
                <input 
                  type="text" 
                  className="form-input"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input 
                  type="text" 
                  className="form-input"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Casa, apartamento, etc. (opcional)</label>
                <input 
                  type="text" 
                  className="form-input"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ciudad</label>
                  <input 
                    type="text" 
                    className="form-input"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Provincia / Estado</label>
                  <div className="select-wrapper">
                    <select 
                      className="form-input"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="Antioquia">Antioquia</option>
                      <option value="Bogotá">Bogotá</option>
                      <option value="Valle">Valle</option>
                      <option value="Santander">Santander</option>
                    </select>
                    <span className="checkmark">✔</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Código postal (opcional)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input 
                  type="tel" 
                  className="form-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="saveInfo" 
                  checked={saveInfo} 
                  onChange={() => setSaveInfo(!saveInfo)} 
                />
                <label htmlFor="saveInfo">Guardar mi información y consultar más rápidamente la próxima vez</label>
              </div>
            </div>

            <div className="shipping-section">
              <h3 className="section-subtitle">Métodos de envío</h3>
              <div className="shipping-method">
                <div className="method-row">
                  <div className="method-name">Standard</div>
                  <div className="method-price">$ 16.000,00</div>
                </div>
              </div>
            </div>
            
            <div className="section-footer">
              <button 
                className="back-btn" 
                onClick={() => setActiveSection('contact')}
              >
                Volver
              </button>
              <button 
                className="next-btn" 
                onClick={() => setActiveSection('payment')}
                disabled={!formData.address || !formData.city || !formData.phone}
              >
                Continuar al pago
              </button>
            </div>
          </div>
        )}

        {activeSection === 'payment' && (
          <div className="section-content">
            <div className="payment-section">
              <p className="secure-text">Todas las transacciones son seguras y están encriptadas.</p>

              <div className="payment-methods">
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="epayco" 
                    name="paymentMethod" 
                    checked={paymentMethod === 'epayco'} 
                    onChange={() => setPaymentMethod('epayco')} 
                  />
                  <label htmlFor="epayco">
                    <div className="payment-label">ePayco</div>
                    <div className="payment-icons">
                      <span>VISA</span>
                      <span>+3</span>
                    </div>
                  </label>
                </div>

                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="addi" 
                    name="paymentMethod" 
                    checked={paymentMethod === 'addi'} 
                    onChange={() => setPaymentMethod('addi')} 
                  />
                  <label htmlFor="addi">
                    <div className="payment-label">Addi</div>
                    <div className="payment-icons">
                      <span>Addi</span>
                    </div>
                  </label>
                </div>

                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="supay" 
                    name="paymentMethod" 
                    checked={paymentMethod === 'supay'} 
                    onChange={() => setPaymentMethod('supay')} 
                  />
                  <label htmlFor="supay">
                    <div className="payment-label">Su + Pay</div>
                    <div className="payment-icons">
                      <span>VISA</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="billing-section">
              <h3 className="section-subtitle">Dirección de facturación</h3>
              
              <div className="billing-options">
                <div className="checkbox-group">
                  <input 
                    type="radio" 
                    id="sameBilling" 
                    name="billingAddress" 
                    checked={sameBilling} 
                    onChange={() => setSameBilling(true)} 
                  />
                  <label htmlFor="sameBilling">
                    La misma dirección de envío
                    <div className="payment-icons">
                      <span>VISA</span>
                    </div>
                  </label>
                </div>

                <div className="checkbox-group">
                  <input 
                    type="radio" 
                    id="differentBilling" 
                    name="billingAddress" 
                    checked={!sameBilling} 
                    onChange={() => setSameBilling(false)} 
                  />
                  <label htmlFor="differentBilling">Usar una dirección de facturación distinta</label>
                </div>
              </div>
            </div>
            
            <div className="section-footer">
              <button 
                className="back-btn" 
                onClick={() => setActiveSection('shipping')}
              >
                Volver
              </button>
              <button 
                className="pay-now-btn"
                onClick={handlePayNow}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Pagar ahora'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;