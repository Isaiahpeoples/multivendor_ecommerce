"use client";
import { CartWithCartItemsType, UserShippingAddressType } from "@/lib/types";
import { Country, ShippingAddress } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import UserShippingAddresses from "../shared/shipping-addresses/shipping-addresses";
import CheckoutProductCard from "../cards/checkout-product";
import PlaceOrderCard from "../cards/place-order";
import { Country as CountryType } from "@/lib/types";
import CountryNote from "../shared/country-note";
import { updateCheckoutProductstWithLatest } from "@/queries/user";

interface Props {
  cart: CartWithCartItemsType;
  countries: Country[];
  addresses: UserShippingAddressType[];
  userCountry: CountryType;
}

const CheckoutContainer: FC<Props> = ({
  cart,
  countries,
  addresses,
  userCountry,
}) => {
  const [cartData, setCartData] = useState<CartWithCartItemsType>(cart);

  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddress | null>(null);

  const activeCountry = addresses.find(
    (add) => add.countryId === selectedAddress?.countryId
  )?.country;

  const { cartItems } = cart;

  useEffect(() => {
    const hydrateCheckoutCart = async () => {
      const updatedCart = await updateCheckoutProductstWithLatest(
        cartItems,
        activeCountry
      );
      setCartData(updatedCart);
    };

    if (cartItems.length > 0) {
      hydrateCheckoutCart();
    }
  }, [activeCountry]);
  return (
    <div className="flex">
      <div className="flex-1 my-3">
        <UserShippingAddresses
          addresses={addresses}
          countries={countries}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <div className="my-2">
          <CountryNote
            country={activeCountry ? activeCountry.name : userCountry.name}
          />
        </div>
        <div className="w-full py-4 px-4 bg-white my-3">
          <div className="relative">
            {cartData.cartItems.map((product) => (
              <CheckoutProductCard
                key={product.variantId}
                product={product}
                isDiscounted={cartData.coupon?.storeId === product.storeId}
              />
            ))}
          </div>
        </div>
      </div>
      <PlaceOrderCard
        cartData={cartData}
        setCartData={setCartData}
        shippingAddress={selectedAddress}
      />
    </div>
  );
};

export default CheckoutContainer;
