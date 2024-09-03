import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styleTitle = {
  color: '#2d2d2d',
  textAlign: 'center',
  fontFamily: 'Bangla MN',
  fontSize: '2rem',
  pb: 2,
  pt: 2,
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#e1c2a3',
  color: '#2d2d2d',
  border: 'none',
  borderRadius: 3,
  boxShadow: 14,
  pt: 4,
  pb: 4,
  pl: 6,
  pr: 6,
  '@media (max-width: 768px)': {
    width: '80%',
  },
};

export function BasicModal({ open, onClose, children, title }) {
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box sx={styleModal}>
        <Typography variant='h6' component='h2' sx={styleTitle}>
          {title}
        </Typography>
        <Typography variant='div' sx={{ mt: 2 }}>
          {children}
        </Typography>
      </Box>
    </Modal>
  );
}
