import axios from "axios";

export const getCardToken = async (cardData: string, accessToken: string) => {
  const response = await axios.post(
    `https://api.mercadopago.com/v1/card_tokens?access_token=${accessToken}`,
    cardData,
  );
  return response.data;
};
