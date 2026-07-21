import React from 'react';
import { RECIPES } from '../../data/recipes';
import { useShop } from '../../context/ShopContext';
import { Clock, Users, ArrowRight, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export const RecipesShowcase: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="py-24 bg-white font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C9A227]">
              <ChefHat className="w-4 h-4" />
              <span>Culinary Creations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 font-serif-luxury">
              Crafted With CROF Reserve
            </h2>
          </div>

          <button
            onClick={() => setActivePage('recipes')}
            className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-[#C9A227] flex items-center gap-2 transition-colors"
          >
            Explore Recipe Journal <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECIPES.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-luxury hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setActivePage('recipes')}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C9A227] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-2 line-clamp-2 leading-relaxed">
                    {recipe.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                      {recipe.cookTime}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-[#C9A227]" />
                      {recipe.servings}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
