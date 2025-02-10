'use client'
import { useCartStore } from '@/cart-store/useCartStore'
import CartProduct from '@/components/store/cards/cart-product'
import FastDelivery from '@/components/store/cards/fast-delivery'
import CartHeader from '@/components/store/cart-page/car-header'
import CartSummary from '@/components/store/cart-page/summary'
import { SecurityPrivacyCard } from '@/components/store/product-page/returns-security-privacy-card'
import useFromStore from '@/hooks/useFromStore'
import { CartProductType } from '@/lib/types'
import { useState } from 'react'

export default function CartPage() {
  const cartItems = useFromStore(useCartStore, (state) => state.cart)

  const [selectedItems, setSelectedItems] = useState<CartProductType[]>([])
  const [totalShipping, setTotalShipping] = useState<number>(0)

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <div className="bg-[#f5f5f5]">
          <div className="max-w-[1200px] mx-auto py-6 flex">
            <div className="min-w-0 flex-1">
              {/* Cart header */}
              <CartHeader
                cartItems={cartItems}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
              <div className="h-auto overflow-x-hidden overflow-auto mt-2">
                {/* Cart items */}
                {cartItems.map((product) => (
                  <CartProduct
                    product={product}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    setTotalShipping={setTotalShipping}
                  />
                ))}
              </div>
            </div>
            {/* Cart side */}
            <div className="sticky top-4 ml-5 w-[380px] max-h-max">
              {/* Cart summary */}
              <CartSummary cartItems={cartItems} shippingFees={totalShipping} />
              <div className="mt-2 p-4 bg-white px-6">
                <FastDelivery />
              </div>
              <div className="mt-2 p-4 bg-white px-6">
                <SecurityPrivacyCard />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No product</div>
      )}
    </div>
  )
}
