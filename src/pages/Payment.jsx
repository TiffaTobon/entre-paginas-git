import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import '../styles/Payment.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    idNumber: '',
    address: '',
    address2: '',
    city: '',
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const returnToStore = () => navigate('/workspace');

  if (paymentSuccess) {
    return (
      <Box
        sx={{
          maxWidth: 500,
          mx: 'auto',
          mt: 5,
          bgcolor: '#f7f7f7',
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          ¡Pago Exitoso!
        </Typography>
        <Typography align="center">Gracias por tu compra</Typography>
        <Typography align="center" sx={{ my: 2 }}>
          Tu número de orden es <strong>{orderNumber}</strong>
        </Typography>
        <Typography align="center">
          Se enviará confirmación a: {formData.email}
        </Typography>
        <Typography align="center">
          Dirección: {formData.address}, {formData.city}
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="outlined"
            onClick={returnToStore}
            sx={{
              paddingX: 4,
              paddingY: 1,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            Regresar al Comercio
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="payment-card">
      <Box className="card-header">
        <h2>Finalizar Compra</h2>
      </Box>

      <Box className="card-body">
        <Box className="steps-nav">
          <button className={`step-btn ${activeSection === 'contact' ? 'active' : ''}`} disabled>
            Contacto
          </button>
          <button
            className={`step-btn ${activeSection === 'shipping' ? 'active' : ''}`}
            disabled={!formData.email}
            onClick={() => setActiveSection('shipping')}
          >
            Envío
          </button>
          <button
            className={`step-btn ${activeSection === 'payment' ? 'active' : ''}`}
            disabled={!formData.address || !formData.city}
            onClick={() => setActiveSection('payment')}
          >
            Pago
          </button>
        </Box>

        {isProcessing && (
          <Typography align="center" className="secure-text">
            Procesando tu pago...
          </Typography>
        )}

        {activeSection === 'contact' && (
          <>
            <TextField
              label="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={emailUpdates}
                  onChange={() => setEmailUpdates(!emailUpdates)}
                />
              }
              label="Deseo recibir novedades por email"
            />
            <Box textAlign="right" mt={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: '#5D4037', '&:hover': { bgcolor: '#4a342e' } }}
                onClick={() => setActiveSection('shipping')}
                disabled={!formData.email}
              >
                Continuar al Envío
              </Button>
            </Box>
          </>
        )}

        {activeSection === 'shipping' && (
          <>
            <TextField label="Nombre completo" name="firstName" value={formData.firstName} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Cédula" name="idNumber" value={formData.idNumber} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Dirección" name="address" value={formData.address} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Complemento (opcional)" name="address2" value={formData.address2} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Ciudad" name="city" value={formData.city} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Código postal (opcional)" name="zipCode" value={formData.zipCode} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Teléfono" name="phone" value={formData.phone} onChange={handleInputChange} fullWidth margin="normal" />

            <FormControlLabel
              control={
                <Checkbox
                  checked={saveInfo}
                  onChange={() => setSaveInfo(!saveInfo)}
                />
              }
              label="Guardar mi información para la próxima vez"
            />

            <Typography sx={{ mt: 2, fontWeight: 'bold', color: '#5D4037' }}>
              Valor domicilio: $8.000
            </Typography>

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="outlined" onClick={() => setActiveSection('contact')}>
                Volver
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: '#5D4037', '&:hover': { bgcolor: '#4a342e' } }}
                onClick={() => setActiveSection('payment')}
                disabled={!formData.address || !formData.city || !formData.phone}
              >
                Continuar al Pago
              </Button>
            </Box>
          </>
        )}

        {activeSection === 'payment' && (
          <>
            <Typography className="secure-text">
              Todas las transacciones son seguras y están encriptadas.
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sameBilling}
                  onChange={() => setSameBilling(!sameBilling)}
                />
              }
              label="La dirección de facturación es igual a la de envío"
            />

            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#5D4037' }}>
              Método de pago
            </Typography>

            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="epayco" control={<Radio />} label="ePayco" />
              <FormControlLabel value="addi" control={<Radio />} label="Addi" />
              <FormControlLabel value="supay" control={<Radio />} label="Su + Pay" />
            </RadioGroup>

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="outlined" onClick={() => setActiveSection('shipping')}>
                Volver
              </Button>
              <Button
                variant="contained"
                onClick={handlePayNow}
                disabled={isProcessing}
                sx={{ bgcolor: '#5D4037', '&:hover': { bgcolor: '#4a342e' } }}
              >
                {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Payment;
