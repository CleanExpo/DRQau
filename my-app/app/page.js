export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to ConsultAI
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          AI-Powered Consultation Assistant
        </p>
        <div className="mt-8">
          <button className="btn-primary">Get Started</button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3>AI Chatbot</h3>
          <p className="text-gray-600">Intelligent conversations and instant responses</p>
        </div>
        <div className="card">
          <h3>Smart Scheduling</h3>
          <p className="text-gray-600">Automated appointment management</p>
        </div>
        <div className="card">
          <h3>Analytics</h3>
          <p className="text-gray-600">Detailed insights and reporting</p>
        </div>
      </section>
    </div>
  )
}
