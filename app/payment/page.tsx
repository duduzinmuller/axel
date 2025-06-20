import PricingPlans from "../_components/PricingPlans";

const Payment = () => {
  return (
    <>
      <div className="min-h-screen items-center justify-center not-visited:flex">
        <div className="flex flex-col items-center justify-center space-y-6">
          <main className="w-full py-10">
            <PricingPlans />
          </main>
        </div>
      </div>
    </>
  );
};

export default Payment;
