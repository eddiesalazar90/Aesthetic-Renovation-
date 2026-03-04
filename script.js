
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  function buildSlider(el){
    const before = el.getAttribute('data-before');
    const after = el.getAttribute('data-after');

    const beforeDiv = document.createElement('div');
    beforeDiv.className = 'ba__img ba__before';
    beforeDiv.style.backgroundImage = `url('${before}')`;

    const afterDiv = document.createElement('div');
    afterDiv.className = 'ba__img ba__after';
    afterDiv.style.backgroundImage = `url('${after}')`;

    const handle = document.createElement('div');
    handle.className = 'ba__handle';

    const knob = document.createElement('div');
    knob.className = 'ba__knob';
    knob.textContent = '↔';

    const range = document.createElement('input');
    range.type = 'range';
    range.min = 0;
    range.max = 100;
    range.value = 50;
    range.className = 'ba__range';

    function set(v){
      const pct = Math.min(100, Math.max(0, Number(v)));
      afterDiv.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
      handle.style.left = pct + '%';
      knob.style.left = pct + '%';
    }

    range.addEventListener('input', (e)=> set(e.target.value));

    el.appendChild(beforeDiv);
    el.appendChild(afterDiv);
    el.appendChild(handle);
    el.appendChild(knob);
    el.appendChild(range);

    el.addEventListener('pointerdown', (e)=>{
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      range.value = pct;
      set(pct);
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e)=>{
      if (e.buttons !== 1) return;
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      range.value = pct;
      set(pct);
    });

    set(50);
  }

  document.querySelectorAll('.ba__slider').forEach(buildSlider);
})();
