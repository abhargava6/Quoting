// Shared behavior for all walkthrough pages.

function openOv(id){ var e=document.getElementById(id); if(e) e.classList.add('open'); }
function closeOv(id){ var e=document.getElementById(id); if(e) e.classList.remove('open'); }

// editable-grid helpers (used by spreadsheet overlays)
function cell(v, cls){ return '<td'+(cls?' class="'+cls+'"':'')+'><div class="cell" contenteditable="true">'+v+'</div></td>'; }
function rn(n){ return '<td class="rownum">'+n+'</td>'; }
function gridRows(rows, vehCol){ // vehCol = index to shade as veh-a, or -1
  return rows.map(function(r,i){
    return '<tr>'+rn(i+1)+r.map(function(c,ci){ return cell(c, ci===vehCol?'veh-a':''); }).join('')+'</tr>';
  }).join('');
}

// presentation deck
var __prezIdx=0;
function prezSet(i){
  var sl=document.querySelectorAll('#prezStage .slide'); if(!sl.length) return;
  if(i<0)i=0; if(i>=sl.length)i=sl.length-1; __prezIdx=i;
  sl.forEach(function(s,k){ s.classList.toggle('show',k===i); });
  document.querySelectorAll('#prezDots i').forEach(function(d,k){ d.classList.toggle('on',k===i); });
}
function prezGo(d){ prezSet(__prezIdx+d); }

document.addEventListener('DOMContentLoaded', function(){
  // close overlays on backdrop click
  document.querySelectorAll('.overlay').forEach(function(ov){
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('open'); });
  });
  // build presentation dots
  var stage=document.getElementById('prezStage');
  if(stage){
    var sl=stage.querySelectorAll('.slide'), dots='';
    for(var i=0;i<sl.length;i++) dots+='<i class="'+(i===0?'on':'')+'" onclick="prezSet('+i+')"></i>';
    var dd=document.getElementById('prezDots'); if(dd) dd.innerHTML=dots;
  }
  // spreadsheet inner tabs
  document.querySelectorAll('.sheet-tabs').forEach(function(bar){
    bar.addEventListener('click', function(e){
      var b=e.target.closest('.sheet-tab'); if(!b) return;
      var app=bar.closest('.sheet-app');
      bar.querySelectorAll('.sheet-tab').forEach(function(t){ t.classList.remove('active'); });
      app.querySelectorAll('.sheet-pane').forEach(function(p){ p.classList.remove('active'); });
      b.classList.add('active');
      var pane=document.getElementById(b.dataset.pane); if(pane) pane.classList.add('active');
    });
  });
  // esc closes any open overlay
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') document.querySelectorAll('.overlay.open').forEach(function(o){o.classList.remove('open');}); });
});
