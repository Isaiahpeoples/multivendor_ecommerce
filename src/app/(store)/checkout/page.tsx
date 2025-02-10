import CheckoutContainer from '@/components/store/checkout-page/container'
import { db } from '@/lib/db'
import { getUserShippingAddresses } from '@/queries/user'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
export default async function CheckoutPage() {
  const user = await currentUser()
  if (!user) redirect('/cart')
  // Get user cart
  const cart = await db.cart.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      cartItems: true,
    },
  })
  if (!cart) redirect('/cart')
  // Get user shipping address
  const addresses = await getUserShippingAddresses()
  // Get list of countries
  const countries = await db.country.findMany({
    orderBy: { name: 'desc' },
  })
  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-conatiner mx-auto py-5 px-2">
        <CheckoutContainer
          cart={cart}
          countries={countries}
          addresses={addresses}
        />
      </div>
    </div>
  )
}
