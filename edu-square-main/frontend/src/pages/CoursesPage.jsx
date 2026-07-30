import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { CourseViewer } from '../components/course/CourseViewer';
import { BookOpen, Search, Star, Users, PlayCircle, PlusCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CoursesPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getCourses().then(setCourses);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('search') || '';
    setSearch(keyword);
  }, [location.search]);

  if (selectedCourse) {
    return <CourseViewer course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  const categories = ['All', 'AI & Data Science', 'Software Engineering', 'Computer Science'];

  const normalizedSearch = search.trim().toLowerCase();

  const filteredCourses = courses.filter((c) => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const searchableText = `${c.title || ''} ${c.description || ''} ${c.code || ''} ${c.category || ''}`.toLowerCase();
    const matchSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            LMS Course <span className="gradient-text">Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Explore video lectures, downloadable notes, and track course progress</p>
        </div>

        {user?.role === 'teacher' && (
          <button
            onClick={() => {
              const title = prompt('Enter new Course Title:');
              if (title) {
                api.createCourse({ title, code: 'CS500', description: 'Newly created course module.' })
                  .then(newC => setCourses([newC, ...courses]));
              }
            }}
            className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Add New Course
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'gradient-bg-primary text-white shadow-glow-blue'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="glass-card rounded-3xl border border-slate-800 p-8 text-center text-sm text-slate-400">
          No courses match your current search. Try a different keyword or clear the search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c._id}
              onClick={() => setSelectedCourse(c)}
              className="glass-card rounded-3xl border border-slate-800 overflow-hidden hover:border-blue-500/50 hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
            >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-500/30">
                  {c.code}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{c.category}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold"><Star className="w-3.5 h-3.5 fill-amber-400" /> {c.rating || 4.8}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">{c.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{c.description}</p>
              </div>
            </div>

              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><PlayCircle className="w-4 h-4 text-blue-400" /> {c.lectures?.length || 4} Video Lessons</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-purple-400" /> {c.studentsCount || 142} Students</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
