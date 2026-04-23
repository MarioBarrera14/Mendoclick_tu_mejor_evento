import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: (process.env.MP_ACCESS_TOKEN || '').trim() 
});

export const mpService = {
  createPlanPreference: async (planData: { name: string, price: number }, externalReference: string) => {
    try {
      const preference = new Preference(client);

      // Usamos la misma URL que ya sabés que funciona
      const baseUrl = "http://localhost:3000"; 

      const response = await preference.create({
        body: {
          items: [
            {
              id: planData.name.toLowerCase(),
              title: `MendoClick - Plan ${planData.name.toUpperCase()}`,
              quantity: 1,
              unit_price: Number(planData.price),
              currency_id: 'ARS',
            }
          ],
          external_reference: String(externalReference),
          back_urls: {
            success: `${baseUrl}/pago-exitoso`,
            failure: `${baseUrl}/tienda`,
            pending: `${baseUrl}/pago-pendiente`,
          },
          // COMENTAMOS ESTA LÍNEA (El culpable del error 400)
          // auto_return: 'approved', 
        }
      });

      return response;
    } catch (error: any) {
      console.error("❌ Error en mpService:", error.message);
      throw new Error(error.message);
    }
  }
};