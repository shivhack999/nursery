const points = [
  "20+ Years of Experience",
  "Pan-India Operations",
  "Trusted by 30+ Event Companies",
  "Professional & Reliable Teams",
  "Specialists in Botanical Garden Setup",
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {points.map((p, i) => (
            <div key={i} className="p-4 border rounded bg-green-50 shadow">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
