// Supabase 初始化
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = "https://obftrwkxgydtjrrsxorc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZnRyd2t4Z3lkdGpycnN4b3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0ODk1MDUsImV4cCI6MjEwNjA2NTUwNX0.2ebhUXwVGVfbA_gs-WwEHLWh6c2YUJeCegexgt6oFXg";

window.supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===================== Dark Mode 暗色模式 =====================
const themeBtn = document.getElementById('themeBtn');
function loadTheme(){
  const t = localStorage.getItem('theme');
  if(t === 'dark') document.documentElement.classList.add('dark');
}
loadTheme();

if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  })
}

// ===================== 全局文章数据容器（从数据库加载后存入这里） =====================
window.articleData = [];

/**
 * 从 supabase 获取全部文章，按日期倒序
 */
window.fetchAllArticles = async function(){
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })

  if(error){
    console.error('fetch articles error:', error);
    return [];
  }
  window.articleData = data || [];
  return window.articleData;
}

/**
 * 根据id获取单篇文章
 * @param {number} id
 */
window.fetchArticleById = async function(id){
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()
  if(error){
    console.error('fetch single article error', error);
    return null;
  }
  return data;
}

/**
 * 按分类筛选
 * @param {string} category
 */
window.fetchArticlesByCategory = async function(category){
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .order('date', {ascending:false})
  if(error) return [];
  return data;
}

/**
 * 按标签筛选（tags 是json数组字段）
 * @param {string} tag
 */
window.fetchArticlesByTag = async function(tag){
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .contains('tags', [tag])
    .order('date', {ascending:false})
  if(error) return [];
  return data;
}

/**
 * 简单前端搜索：标题、摘要匹配关键词
 * @param {string} keyword
 */
window.searchArticles = function(keyword){
  const kw = keyword.toLowerCase().trim();
  if(!kw) return [];
  return window.articleData.filter(item=>{
    return item.title.toLowerCase().includes(kw)
        || item.excerpt?.toLowerCase().includes(kw)
        || item.content?.toLowerCase().includes(kw)
  })
}

// ===================== Music 听歌模块：跳转QQ音乐 =====================
window.playMusic = function(songId){
  window.open(`https://y.qq.com/n/ryqq/songDetail/${songId}`, '_blank')
}

// ===================== 工具：格式化日期 =====================
window.formatDate = function(datestr){
  if(!datestr) return '';
  return new Date(datestr).toLocaleDateString('en‑US');
}
