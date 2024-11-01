const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'aud',
        product_data: {
          name: 'Rubbish Removal Service',
          description: `${formData.numberOfBags} bags - Pickup on ${formData.pickupDate}`,
        },
        unit_amount: 800, // $8.00 in cents
      },
      quantity: formData.numberOfBags,
    },
  ],
  metadata: {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    address: formData.streetAddress,
    suburb: formData.suburb,
    postcode: formData.postcode,
    pickupDate: formData.pickupDate,
    specialInstructions: formData.specialInstructions,
  },
  // ... rest of your session config
}); 