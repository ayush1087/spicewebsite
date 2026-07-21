import React, { useState } from 'react';
import { RECIPES } from '../../data/recipes';
import type { Recipe } from '../../data/recipes';
import { Clock, Users, ChefHat, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RecipesPage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="pt-32 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Culinary Journal
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-luxury text-gray-900">
            Masterclass Recipes & Spice Pairings
          </h1>
          <p className="text-xs text-gray-500 font-light">
            Created by master chefs using CROF single-origin cold stone-ground spices.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECIPES.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-luxury hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-[#C9A227] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-2 line-clamp-2">{recipe.subtitle}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C9A227]" /> {recipe.cookTime}
                  </span>
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    View Recipe <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRecipe(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 z-50 max-h-[85vh] overflow-y-auto space-y-6">
              <button onClick={() => setSelectedRecipe(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
              <img src={selectedRecipe.image} alt="" className="w-full h-64 object-cover rounded-2xl" />
              <div>
                <span className="text-xs font-bold uppercase text-[#C9A227]">{selectedRecipe.category}</span>
                <h2 className="text-2xl font-bold font-serif-luxury text-gray-900">{selectedRecipe.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{selectedRecipe.subtitle}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Ingredients Needed</h3>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Preparation Steps</h3>
                <ol className="list-decimal pl-5 text-xs text-gray-600 space-y-2">
                  {selectedRecipe.instructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
