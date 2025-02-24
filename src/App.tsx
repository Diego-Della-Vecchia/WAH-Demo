import { useState } from 'react';
import {
  ShoppingBasket,
  Leaf,
  Coffee,
  Truck,
  Calendar,
  ChevronRight,
} from 'lucide-react';

type SubscriptionType = 'weekly' | 'monthly';
type SubscriptionTier = 'basic' | 'plus' | 'premium';

function App() {
  const [step, setStep] = useState(1);
  const [subscriptionType, setSubscriptionType] =
    useState<SubscriptionType>('weekly');
  const [subscriptionTier, setSubscriptionTier] =
    useState<SubscriptionTier>('basic');
  const [deliveryDays, setDeliveryDays] = useState<string[]>([]);
  const [ecoCompensation, setEcoCompensation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'credit-card' | 'paypal' | 'twint'
  >('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Generate next 14 days for delivery selection
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= (subscriptionType == 'weekly' ? 7 : 30); i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const handleDaySelection = (day: string) => {
    const maxDeliveries = subscriptionType === 'weekly' ? 3 : 12;
    if (deliveryDays.includes(day)) {
      setDeliveryDays(deliveryDays.filter((d) => d !== day));
    } else if (deliveryDays.length < maxDeliveries) {
      setDeliveryDays([...deliveryDays, day]);
    }
  };

  const getPrice = () => {
    if (subscriptionType === 'weekly') {
      switch (subscriptionTier) {
        case 'basic':
          return 6;
        case 'plus':
          return 12;
        case 'premium':
          return 15;
      }
    } else {
      switch (subscriptionTier) {
        case 'basic':
          return 20;
        case 'plus':
          return 40;
        case 'premium':
          return 50;
      }
    }
  };

  return (
    <div className='min-h-screen bg-bakery-50 flex flex-col'>
      {/* Header */}
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <img src='/logo.svg' alt='' className='w-14' />
              <span className='text-4xl font-semibold text-bakery-900'>
                Ofenfrisch
              </span>
            </div>
            <div className='flex items-center space-x-4 text-bakery-700'>
              <Leaf className='h-5 w-5' />
              <span className='text-2xl'>Bio & Regional</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className='relative'>
        <img
          src='https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2048'
          alt='Fresh bread'
          className='w-full h-[400px] object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='text-center text-white'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              Frisches Gebäck direkt zu Ihnen
            </h1>
            <p className='text-xl md:text-2xl'>
              Wöchentlich oder monatlich - Sie entscheiden
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Selection */}
      <div className='max-w-4xl mx-auto px-4 py-12'>
        <div className='bg-white rounded-lg shadow-lg p-6 md:p-8'>
          {/* Progress Steps */}
          <div className='flex justify-between gap-2 mb-8'>
            {[1, 2, 3, 4, 5].map((number) => (
              <div
                key={number}
                className={`flex items-center ${
                  step >= number ? 'text-bakery-700' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= number
                      ? 'border-bakery-700 bg-bakery-700 text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {number}
                </div>
                <div className='ml-2'>
                  {number === 1 && 'Abo wählen'}
                  {number === 2 && 'Paket wählen'}
                  {number === 3 && 'Liefertermine'}
                  {number === 4 && 'Bestätigung'}
                  {number === 5 && 'Bezahlung'}
                </div>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold text-bakery-900 mb-6'>
                Wählen Sie Ihr Abo-Modell
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <button
                  onClick={() => setSubscriptionType('weekly')}
                  className={`p-6 rounded-lg border-2 ${
                    subscriptionType === 'weekly'
                      ? 'border-bakery-700 bg-bakery-50'
                      : 'border-gray-200'
                  }`}
                >
                  <Calendar className='h-8 w-8 text-bakery-700 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Wöchentlich</h3>
                  <p className='text-gray-600'>3 Lieferungen pro Woche</p>
                  <p className='text-bakery-700 font-semibold mt-4'>
                    Ab 6 CHF / Lieferung
                  </p>
                </button>

                <button
                  onClick={() => setSubscriptionType('monthly')}
                  className={`p-6 rounded-lg border-2 ${
                    subscriptionType === 'monthly'
                      ? 'border-bakery-700 bg-bakery-50'
                      : 'border-gray-200'
                  }`}
                >
                  <Calendar className='h-8 w-8 text-bakery-700 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Monatlich</h3>
                  <p className='text-gray-600'>12 Lieferungen pro Monat</p>
                  <p className='text-bakery-700 font-semibold mt-4'>
                    Ab 20 CHF / Monat
                  </p>
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className='mt-8 w-full bg-bakery-700 text-white py-3 px-6 rounded-lg hover:bg-bakery-800 transition-colors flex items-center justify-center'
              >
                Weiter <ChevronRight className='ml-2 h-5 w-5' />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold text-bakery-900 mb-6'>
                Wählen Sie Ihr Paket
              </h2>
              <div className='grid md:grid-cols-3 gap-6'>
                <button
                  onClick={() => setSubscriptionTier('basic')}
                  className={`p-6 rounded-lg border-2 ${
                    subscriptionTier === 'basic'
                      ? 'border-bakery-700 bg-bakery-50'
                      : 'border-gray-200'
                  }`}
                >
                  <ShoppingBasket className='h-8 w-8 text-bakery-700 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Basic</h3>
                  <p className='text-gray-600'>Brot & Brötchen</p>
                  <p className='text-bakery-700 font-semibold mt-2'>
                    {subscriptionType === 'weekly' ? '6 CHF' : '20 CHF'}
                  </p>
                  <ul className='mt-4 text-sm text-gray-600'>
                    <li>✓ Frisches Brot</li>
                    <li>✓ Verschiedene Brötchen</li>
                    <li>✓ Regional & Bio</li>
                  </ul>
                </button>

                <button
                  onClick={() => setSubscriptionTier('plus')}
                  className={`p-6 rounded-lg border-2 ${
                    subscriptionTier === 'plus'
                      ? 'border-bakery-700 bg-bakery-50'
                      : 'border-gray-200'
                  }`}
                >
                  <ShoppingBasket className='h-8 w-8 text-bakery-700 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Plus</h3>
                  <p className='text-gray-600'>Basic + Süssgebäck</p>
                  <p className='text-bakery-700 font-semibold mt-2'>
                    {subscriptionType === 'weekly' ? '12 CHF' : '40 CHF'}
                  </p>
                  <ul className='mt-4 text-sm text-gray-600'>
                    <li>✓ Alles von Basic</li>
                    <li>✓ Süssgebäck</li>
                    <li>✓ Saisonale Spezialitäten</li>
                  </ul>
                </button>

                <button
                  onClick={() => setSubscriptionTier('premium')}
                  className={`p-6 rounded-lg border-2 ${
                    subscriptionTier === 'premium'
                      ? 'border-bakery-700 bg-bakery-50'
                      : 'border-gray-200'
                  }`}
                >
                  <Coffee className='h-8 w-8 text-bakery-700 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>Premium</h3>
                  <p className='text-gray-600'>Plus + Getränk</p>
                  <p className='text-bakery-700 font-semibold mt-2'>
                    {subscriptionType === 'weekly' ? '15 CHF' : '50 CHF'}
                  </p>
                  <ul className='mt-4 text-sm text-gray-600'>
                    <li>✓ Alles von Plus</li>
                    <li>✓ Bio-Getränk</li>
                    <li>✓ Premium Auswahl</li>
                  </ul>
                </button>
              </div>

              <div className='flex justify-between mt-8'>
                <button
                  onClick={() => setStep(1)}
                  className='text-bakery-700 hover:text-bakery-800'
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  className='bg-bakery-700 text-white py-3 px-6 rounded-lg hover:bg-bakery-800 transition-colors flex items-center'
                >
                  Weiter <ChevronRight className='ml-2 h-5 w-5' />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold text-bakery-900 mb-6'>
                Wählen Sie Ihre Liefertermine
              </h2>
              <p className='text-gray-600 mb-4'>
                Bitte wählen Sie {subscriptionType === 'weekly' ? '3' : '12'}{' '}
                Liefertermine aus:
              </p>
              <div className='grid grid-cols-2 md:grid-cols-7 gap-2'>
                {getNextDays().map((day) => {
                  const date = new Date(day);
                  const isSelected = deliveryDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => handleDaySelection(day)}
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? 'border-bakery-700 bg-bakery-50 text-bakery-900'
                          : 'border-gray-200 hover:border-bakery-300'
                      } ${
                        deliveryDays.length >=
                          (subscriptionType === 'weekly' ? 3 : 12) &&
                        !isSelected
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={
                        deliveryDays.length >=
                          (subscriptionType === 'weekly' ? 3 : 12) &&
                        !isSelected
                      }
                    >
                      <div className='text-sm font-semibold'>
                        {date.toLocaleDateString('de-CH', { weekday: 'short' })}
                      </div>
                      <div className='text-lg font-bold'>{date.getDate()}</div>
                      <div className='text-sm'>
                        {date.toLocaleDateString('de-CH', { month: 'short' })}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className='flex justify-between mt-8'>
                <button
                  onClick={() => setStep(2)}
                  className='text-bakery-700 hover:text-bakery-800'
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(4)}
                  className='bg-bakery-700 text-white py-3 px-6 rounded-lg hover:bg-bakery-800 transition-colors flex items-center'
                  disabled={
                    deliveryDays.length <
                    (subscriptionType === 'weekly' ? 3 : 12)
                  }
                >
                  Weiter <ChevronRight className='ml-2 h-5 w-5' />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold text-bakery-900 mb-6'>
                Ihre Bestellung
              </h2>
              <div className='bg-bakery-50 p-6 rounded-lg'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <h3 className='font-semibold text-lg'>
                      {subscriptionType === 'weekly'
                        ? 'Wöchentliches'
                        : 'Monatliches'}{' '}
                      Abo
                    </h3>
                    <p className='text-gray-600'>
                      {subscriptionType === 'weekly'
                        ? '3 Lieferungen/Woche'
                        : '12 Lieferungen/Monat'}
                    </p>
                  </div>
                  <p className='font-semibold'>{getPrice()} CHF</p>
                </div>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <h3 className='font-semibold text-lg'>
                      {subscriptionTier === 'basic'
                        ? 'Basic Paket'
                        : subscriptionTier === 'plus'
                          ? 'Plus Paket'
                          : 'Premium Paket'}
                    </h3>
                    <p className='text-gray-600'>
                      {subscriptionTier === 'basic'
                        ? 'Brot & Brötchen'
                        : subscriptionTier === 'plus'
                          ? 'Mit Süssgebäck'
                          : 'Mit Getränk'}
                    </p>
                  </div>
                </div>

                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <h4 className='font-semibold mb-2'>
                    Gewählte Liefertermine:
                  </h4>
                  <div className='grid grid-cols-3 gap-2'>
                    {deliveryDays.map((day) => (
                      <div
                        key={day}
                        className='text-sm p-2 bg-white rounded border border-gray-200'
                      >
                        {new Date(day).toLocaleDateString('de-CH')}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={ecoCompensation}
                      onChange={() => {
                        setEcoCompensation(!ecoCompensation);
                      }}
                      id='eco'
                      className='h-4 w-4 text-bakery-700 rounded border-gray-300'
                    />
                    <label htmlFor='eco' className='ml-2 text-gray-600'>
                      CO₂-Kompensation (+2 CHF)
                    </label>
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200'>
                <div className='flex items-center'>
                  <Truck className='h-6 w-6 text-bakery-700 mr-2' />
                  <span>Lieferung innerhalb von 24 Stunden</span>
                </div>
                <Leaf className='h-6 w-6 text-bakery-700' />
              </div>

              <div className='flex justify-between mt-8'>
                <button
                  onClick={() => setStep(3)}
                  className='text-bakery-700 hover:text-bakery-800'
                >
                  Zurück
                </button>
                <button
                  onClick={() => {
                    setStep(5);
                  }}
                  className='bg-bakery-700 text-white py-3 px-6 rounded-lg hover:bg-bakery-800 transition-colors'
                >
                  Zur Kasse
                </button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold text-bakery-900 mb-6'>
                Bezahlung
              </h2>

              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='mb-4'>
                  <label
                    htmlFor='paymentMethod'
                    className='block font-medium text-gray-700'
                  >
                    Zahlungsmethode
                  </label>
                  <select
                    id='paymentMethod'
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value as 'credit-card' | 'paypal' | 'twint'
                      )
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bakery-500 focus:ring focus:ring-bakery-200 sm:text-sm p-2'
                  >
                    <option value='credit-card'>Kreditkarte</option>
                    <option value='paypal'>PayPal</option>
                    <option value='twint'>Twint</option>
                  </select>
                </div>

                {paymentMethod === 'credit-card' && (
                  <div>
                    <div className='mb-4'>
                      <label
                        htmlFor='cardNumber'
                        className='block font-medium text-gray-700'
                      >
                        Kartennummer
                      </label>
                      <input
                        type='text'
                        id='cardNumber'
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bakery-500 focus:ring focus:ring-bakery-200 sm:text-sm p-2'
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label
                          htmlFor='expiryDate'
                          className='block font-medium text-gray-700'
                        >
                          Ablaufdatum
                        </label>
                        <input
                          type='text'
                          id='expiryDate'
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bakery-500 focus:ring focus:ring-bakery-200 sm:text-sm p-2'
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='cvv'
                          className='block font-medium text-gray-700'
                        >
                          CVV
                        </label>
                        <input
                          type='text'
                          id='cvv'
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bakery-500 focus:ring focus:ring-bakery-200 sm:text-sm p-2'
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Add conditional rendering for PayPal and Twint if needed */}

                <div className='mt-6'>
                  <button className='w-full bg-bakery-700 text-white py-3 px-6 rounded-lg hover:bg-bakery-800 transition-colors'>
                    Bezahlen
                  </button>
                </div>
              </div>

              <div className='flex justify-between mt-8'>
                <button
                  onClick={() => setStep(4)}
                  className='text-bakery-700 hover:text-bakery-800'
                >
                  Zurück
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-bakery-900 text-white py-8 mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Über uns</h3>
              <p className='text-bakery-200'>
                Ofenfrisch liefert Ihnen frisches, regionales Bio-Gebäck direkt
                nach Hause.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Nachhaltigkeit</h3>
              <p className='text-bakery-200'>
                Wir verwenden ausschliesslich recycelbare Verpackungen und
                regionale Bio-Zutaten.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Kontakt</h3>
              <p className='text-bakery-200'>
                Email: info@ofenfrisch.ch
                <br />
                Tel: 041 123 45 67
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
