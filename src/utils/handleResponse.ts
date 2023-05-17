import { PayloadAction } from "@reduxjs/toolkit";

 

export const handleErrorResponse = (state: any , action: PayloadAction<any>) => {
  const response = action.payload.response;

  if(response.data)P{

    
  }

  const data = action.payload.response.data;

  return state;
};
// ameter) state: WritableDraft<initialStateProps>