import React, { useState } from 'react';
import { Plane, Calculator, Percent, Users, Clock, Calendar } from 'lucide-react';
import { predictOverbooking } from './prediction';

function App() {
  const [formData, setFormData] = useState({
    percentageCheapFares: 20,
    percentageFlexibleFares: 30,
    historicalNoShowRate: 7,
    expectedNoShowRate: 5,
    historicalOverbookingRate: 6
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = predictOverbooking(
        formData.percentageCheapFares / 100,
        formData.percentageFlexibleFares / 100,
        formData.historicalNoShowRate / 100,
        formData.expectedNoShowRate / 100,
        formData.historicalOverbookingRate / 100
      );
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-gradient-to-br from-blue-900/95 via-gray-900/95 to-black/95">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-full">
                <Plane className="w-12 h-12 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                Калькулятор овербукинга
              </h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Оптимизируйте заполняемость рейсов с помощью интеллектуального расчета овербукинга, основанного на исторических данных и текущих тенденциях
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                      <Percent className="w-5 h-5" />
                      Тарифы и цены
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Процент дешевых билетов (%)
                      </label>
                      <input
                        type="number"
                        name="percentageCheapFares"
                        value={formData.percentageCheapFares}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Процент гибких тарифов (%)
                      </label>
                      <input
                        type="number"
                        name="percentageFlexibleFares"
                        value={formData.percentageFlexibleFares}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Статистика неявки
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Исторический процент неявки (%)
                      </label>
                      <input
                        type="number"
                        name="historicalNoShowRate"
                        value={formData.historicalNoShowRate}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ожидаемый процент неявки (%)
                      </label>
                      <input
                        type="number"
                        name="expectedNoShowRate"
                        value={formData.expectedNoShowRate}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5" />
                    История овербукинга
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Исторический процент овербукинга (%)
                    </label>
                    <input
                      type="number"
                      name="historicalOverbookingRate"
                      value={formData.historicalOverbookingRate}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="0.1"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {loading ? 'Вычисление...' : 'Рассчитать овербукинг'}
                </button>
              </form>

              {prediction !== null && (
                <div className="mt-8">
                  <div className="bg-blue-600/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30">
                    <h2 className="text-xl font-semibold mb-2 text-center text-blue-300">
                      Рекомендуемый процент овербукинга
                    </h2>
                    <div className="text-6xl font-bold text-center text-blue-400 mb-4">
                      {prediction.toFixed(1)}%
                    </div>
                    <p className="text-gray-300 text-center">
                      Вы можете продать дополнительно {Math.round(prediction)}% мест сверх вместимости самолета
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;