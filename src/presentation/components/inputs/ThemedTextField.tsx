import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const ThemedTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#116530'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#18A558',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#18A558',
      },
      '&:hover fieldset': {
        borderColor: '#116530',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#116530',
      },
    },
  });

  export default ThemedTextField;