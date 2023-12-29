exports.handler = async function (event, context) {
  try {
    console.log('Received request:', event)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: event.body.amount,
      currency: 'usd',
    })

    console.log('Payment intent created:', paymentIntent)

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}
