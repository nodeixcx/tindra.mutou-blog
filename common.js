// Dark mode
const themeBtn = document.getElementById('themeBtn');
function loadTheme(){
  const t = localStorage.getItem('theme');
  if(t==='dark') document.documentElement.classList.add('dark');
}
loadTheme();
if(themeBtn){
  themeBtn.onclick = ()=>{
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark?'dark':'light');
  }
}

// Sample article data, replace with Supabase later
window.articleData = [
  {
    id:1,
    title:"Sample Post 1",
    date:"2026‑09‑01",
    category:"Life",
    tags:["Diary","Note"],
    excerpt:"Sample excerpt for your blog post."
  },
  {
    id:2,
    title:"Coding Notes",
    date:"2026‑09‑10",
    category:"Tech",
    tags:["JS","Frontend"],
    excerpt:"Notes about building static websites."
  }
]

// Music player: open QQ Music in new tab
window.playMusic = function(songId){
  window.open(`https://y.qq.com/n/ryqq/songDetail/${songId}`)
}
