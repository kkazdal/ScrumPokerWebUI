import React, { JSX } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { TextField } from "@mui/material";

interface IPROPS {
  label: string;
  formControl: any; // useForm'dan gelen control nesnesi
  name: string; // Input için name
  requiredMessage?: string;
}

export const TextFieldFormControl = ({
  label,
  formControl,
  name,
  requiredMessage = ""
}: IPROPS): JSX.Element => {
  return (
    <Controller
      control={formControl} // formControl'dan gelen control nesnesi
      name={name} // name parametresini kullanıyoruz
      rules={{
        required: requiredMessage, // required validasyon kuralı ekliyoruz
      }}
      defaultValue="" // Başlangıç değeri belirtmek çok önemli!
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          type="text"
          variant="outlined"
          error={!!error} // Eğer validasyon hatası varsa `error` true yapılır
          helperText={error ? error.message : ""} // Hata mesajını gösterir
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px", // border-radius ekledik
            },
          }}
        />
      )}
    />
  );
};
