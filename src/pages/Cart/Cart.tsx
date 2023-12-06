import { Link } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { QuantityController } from 'src/components/QuantityController'
import pagePath from 'src/constants/path'
import usePurchases from 'src/hooks/usePurchases'
import { formatToCompactValue, formatToLocalizedValue, generateNameId } from 'src/utils/utils'

const Cart = () => {
  const { data: productsInBag } = usePurchases()

  return (
    <>
      <div className='bg-neutral-100 py-16'>
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <Input type='checkbox' classNameInput='h-5 w-5 accent-orange' />
                    </div>
                    <div className='flex-grow text-black'>product</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>unit price</div>
                    <div className='col-span-1'>quantity</div>
                    <div className='col-span-1'>total price</div>
                    <div className='col-span-1'>actions</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {productsInBag?.data.map((purchase) => {
                  const nameId = generateNameId({ name: purchase.product.name, id: purchase.product._id })

                  return (
                    <div
                      key={purchase._id}
                      className='mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                    >
                      <div className='col-span-6'>
                        <div className='flex items-center'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <Input type='checkbox' classNameInput='h-5 w-5 accent-orange' />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link to={`${pagePath.home}${nameId}`} className='h-20 w-20 flex-shrink-0'>
                                <div className='relative w-full pt-[100%]'>
                                  <img
                                    src={purchase.product.image}
                                    alt={purchase.product.name}
                                    className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                                  />
                                </div>
                              </Link>
                              <div className='flex-grow px-2 pb-2 pt-1 text-left'>
                                <Link to={`${pagePath.home}${nameId}`} className='line-clamp-2'>
                                  {purchase.product.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center'>
                              <span className='text-gray-300 line-through'>
                                ₫{formatToLocalizedValue(purchase.price_before_discount)}
                              </span>
                              <span className='ml-3'>₫{formatToLocalizedValue(purchase.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              max={purchase.product.quantity}
                              value={purchase.buy_count}
                              classNameWrapper='flex items-center'
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>
                              ₫{formatToLocalizedValue(purchase.product.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <Button className='bg-none capitalize transition-colors hover:text-orange'>delete</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <Input type='checkbox' classNameInput='h-5 w-5 accent-orange' />
              </div>
              <Button className='mx-3 border-none bg-none capitalize'>select all</Button>
              <Button className='mx-3 border-none bg-none capitalize'>delete</Button>
            </div>
            <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center sm:justify-end'>
                  <div className='capitalize'>total (0 item):</div>
                  <div className='ml-2 text-2xl text-orange'>₫{formatToLocalizedValue(9000)}</div>
                </div>
                <div className='flex items-center text-sm sm:justify-end'>
                  <div className='capitalize text-gray-500'>saved</div>
                  <div className='ml-6 text-sm text-orange'>₫{formatToCompactValue(90000)}</div>
                </div>
              </div>
              <Button className='mt-5 flex h-12 w-44 items-center justify-center bg-red-500 px-2 py-4 text-center text-sm capitalize text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                check out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
