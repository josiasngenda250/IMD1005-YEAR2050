// music.js - Future of Music interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initTypingEffect();
    initAiLyricGenerator();
    initSonicLab();
    initSpatialSound();
    initTimelineEvents();
    initPoll();
    initHoverSounds();
  });
  
  // Theme Toggle
  function initThemeToggle() {
    const toggleBtn = document.getElementById('toggle-theme');
    const htmlEl = document.documentElement;
    
    if (!toggleBtn) return;
    
    // Set the initial icon based on current theme
    updateThemeIcon(toggleBtn, htmlEl.getAttribute('data-theme'));
    
    toggleBtn.addEventListener('click', function() {
      if (htmlEl.getAttribute('data-theme') === 'dark') {
        htmlEl.setAttribute('data-theme', 'light');
        updateThemeIcon(toggleBtn, 'light');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        updateThemeIcon(toggleBtn, 'dark');
      }
    });
  }
  
  // Update theme toggle icon based on current theme
  function updateThemeIcon(button, theme) {
    if (theme === 'dark') {
      button.textContent = '☀️'; // Sun icon for switching to light mode
    } else {
      button.textContent = '🌙'; // Moon icon for switching to dark mode
    }
  }
  
  // Mobile Navigation Menu
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      });
      
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
          }
        });
      });
    }
  }
  
  // Typing Text Effect
  function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const typingSound = document.getElementById('typing-sound');
    const text = "Now generating immersive soundscapes...";
    let i = 0;
    let typingFinished = false;
    
    if (!typingText || !typingSound) return;
    
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        
        // Keep playing typing sound while typing
        if (typingSound.paused && !typingFinished) {
          // Only start playing once
          typingSound.play().catch(e => console.log("Audio playback prevented:", e));
        }
        
        setTimeout(typeWriter, 100);
      } else {
        // When typing is finished, stop the sound immediately
        typingFinished = true;
        typingSound.pause();
        typingSound.currentTime = 0;
      }
    }
    
    // Start typing with a slight delay
    setTimeout(() => {
      typingText.textContent = ''; // Clear initial text
      typeWriter();
    }, 500);
  }
  
  // AI Lyric Generator
  function initAiLyricGenerator() {
    const generateBtn = document.getElementById('generate-lyric');
    const lyricDisplay = document.getElementById('lyric-display');
    const lyricSound = document.getElementById('lyric-sound');
    
    if (!generateBtn || !lyricDisplay || !lyricSound) return;
    
    const futuristicLyrics = [
      "Neural waves cascade through digital harmony, your consciousness synced to the beat of tomorrow.",
      "In the quantum soundscape, we dance between dimensions, frequencies unbound by time.",
      "Brainwave melodies translate emotions into sound, no words needed when minds connect.",
      "Your DNA is the sheet music, cells vibrating in perfect harmony with the cosmic symphony.",
      "AI composers weave your memories into melodies, past and future merging in sound.",
      "Sonic architecture builds new realities, step inside the music and become the rhythm.",
      "Emotional algorithms decode the soundtrack of your life, adapting as your feelings shift.",
      "Subatomic vibrations whisper ancient truths, neural implants translating the universe's song.",
      "Time spirals in audio dimensions, yesterday's echoes harmonizing with tomorrow's beats.",
      "Sentient melodies evolve through the night, learning your dreams to compose a new dawn."
    ];
    
    generateBtn.addEventListener('click', function() {
      // Play lyric glitch sound
      lyricSound.currentTime = 0;
      lyricSound.play().catch(e => console.log("Audio playback prevented:", e));
      
      // Add glitch animation class
      lyricDisplay.classList.add('glitching');
      
      // Choose random lyric
      const randomLyric = futuristicLyrics[Math.floor(Math.random() * futuristicLyrics.length)];
      
      // Display after short delay for effect
      setTimeout(() => {
        lyricDisplay.textContent = randomLyric;
        lyricDisplay.classList.remove('glitching');
        
        // Add appearing animation if GSAP is available
        if (typeof gsap !== 'undefined') {
          gsap.from(lyricDisplay, {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }, 800);
    });
  }
  
  // Sonic Lab Sound Pads
  function initSonicLab() {
    const padBtns = document.querySelectorAll('.pad-btn');
    
    // Track which sounds are currently playing
    const playingStatus = {
      synth: false,
      drum: false,
      glitch: false
    };
    
    padBtns.forEach(btn => {
      const soundType = btn.getAttribute('data-sound');
      const soundEl = document.getElementById(`${soundType}-sound`);
      const waveformEl = document.getElementById(`${soundType}-wave`);
      
      if (!soundEl || !waveformEl) return;
      
      btn.addEventListener('click', function() {
        // Toggle sound play/pause based on current state
        if (playingStatus[soundType]) {
          // If sound is playing, pause it
          soundEl.pause();
          soundEl.currentTime = 0; // Reset to beginning
          playingStatus[soundType] = false;
          
          // Remove active state from button
          btn.classList.remove('active');
          
          // Stop the waveform animation
          waveformEl.innerHTML = '';
        } else {
          // If sound isn't playing, play it
          soundEl.currentTime = 0; // Reset to beginning
          soundEl.play().catch(e => console.log("Audio playback prevented:", e));
          playingStatus[soundType] = true;
          
          // Add active state to button
          btn.classList.add('active');
          
          // Create wave animation
          createWaveAnimation(waveformEl);
        }
      });
    });
  }
  
  // Create waveform visualization
  function createWaveAnimation(waveformEl) {
    // Clear previous waveform
    waveformEl.innerHTML = '';
    
    // Create wave bars
    const numBars = 20;
    for (let i = 0; i < numBars; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      
      // Set random height for initial wave shape
      const height = Math.floor(Math.random() * 70) + 10;
      bar.style.height = `${height}%`;
      
      // Set position
      bar.style.left = `${(i / numBars) * 100}%`;
      
      // Set animation delay
      bar.style.animationDelay = `${i * 0.03}s`;
      
      waveformEl.appendChild(bar);
    }
    
    // Create animation with GSAP if available
    if (typeof gsap !== 'undefined') {
      // We're not setting onComplete to keep the animation going while sound plays
      gsap.to(waveformEl.querySelectorAll('.wave-bar'), {
        height: () => Math.floor(Math.random() * 70) + 10 + '%',
        duration: 0.3,
        repeat: -1, // Infinite repeat while sound is playing
        ease: "sine.inOut",
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
    }
  }
  
  // Spatial Sound/3D Concert Experience
  function initSpatialSound() {
    const spatialContainer = document.getElementById('spatial-sound');
    const indicator = document.querySelector('.spatial-indicator');
    const toggleBtn = document.getElementById('toggle-spatial');
    const ambientSound = document.getElementById('ambient-sound');
    
    if (!spatialContainer || !indicator || !toggleBtn || !ambientSound) return;
    
    let isPlaying = false;
    
    // Control spatial position with mouse movement
    spatialContainer.addEventListener('mousemove', function(e) {
      const rect = spatialContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      // Move the indicator to follow mouse
      indicator.style.left = `${xPercent}%`;
      indicator.style.top = `${yPercent}%`;
      
      // Add trail effect
      createTrailEffect(spatialContainer, xPercent, yPercent);
      
      // If ambient sound is playing, adjust volume according to position
      if (isPlaying && ambientSound) {
        const volumeLevel = 0.5 + (yPercent / 200); // 0.5 to 1 range
        ambientSound.volume = Math.min(volumeLevel, 1.0);
      }
    });
    
    // Toggle 3D sound on/off
    toggleBtn.addEventListener('click', function() {
      if (!ambientSound) return;
      
      if (isPlaying) {
        ambientSound.pause();
        toggleBtn.textContent = "Enable 3D Sound";
        isPlaying = false;
      } else {
        ambientSound.currentTime = 0; // Reset to beginning
        ambientSound.play().catch(e => console.log("Audio playback prevented:", e));
        toggleBtn.textContent = "Disable 3D Sound";
        isPlaying = true;
      }
    });
  }
  
  // Create trail effect for the spatial sound
  function createTrailEffect(container, x, y) {
    const trail = document.createElement('div');
    trail.className = 'sound-trail';
    trail.style.left = `${x}%`;
    trail.style.top = `${y}%`;
    
    container.appendChild(trail);
    
    // Animate and remove with GSAP if available
    if (typeof gsap !== 'undefined') {
      gsap.to(trail, {
        opacity: 0,
        scale: 3,
        duration: 1,
        onComplete: () => {
          trail.remove();
        }
      });
    } else {
      // Fallback animation with CSS
      setTimeout(() => {
        trail.style.opacity = 0;
        trail.style.transform = 'translate(-50%, -50%) scale(3)';
        setTimeout(() => trail.remove(), 1000);
      }, 10);
    }
  }
  
  // Timeline Events
  function initTimelineEvents() {
    const timelineItems = document.querySelectorAll('.year-item');
    
    timelineItems.forEach(item => {
      item.addEventListener('click', function() {
        // Get the year data
        const year = item.getAttribute('data-year');
        
        // Add highlight effect
        timelineItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Animate the timeline item with GSAP if available
        if (typeof gsap !== 'undefined') {
          gsap.to(item, {
            scale: 1.1,
            duration: 0.3,
            boxShadow: "0 0 20px var(--accent), 0 0 40px var(--accent)",
            yoyo: true,
            repeat: 1
          });
        }
      });
    });
  }
  
  // Poll Functionality
  function initPoll() {
    const pollBtns = document.querySelectorAll('.poll-btn');
    const pollResults = document.querySelector('.poll-results');
    
    if (!pollBtns.length || !pollResults) return;
    
    // Create initial poll results data with realistic distribution
    let results = {
      ai: 35,
      vr: 30,
      brainwave: 25,
      robots: 10
    };
    
    // First check localStorage
    if (localStorage.getItem('pollResults2050')) {
      try {
        results = JSON.parse(localStorage.getItem('pollResults2050'));
      } catch (e) {
        console.error("Error parsing poll results:", e);
      }
    }
    
    // Update initial poll results visually right away
    updatePollResults(results);
    
    // Show initial animation for poll results
    if (typeof gsap !== 'undefined') {
      gsap.from('.result-bar', {
        width: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.5
      });
    }
    
    pollBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const option = btn.getAttribute('data-option');
        
        // Increase the selected option by 10%
        results[option] += 10;
        
        // Decrease other options proportionally
        const otherOptions = Object.keys(results).filter(key => key !== option);
        otherOptions.forEach(key => {
          results[key] = Math.max(0, results[key] - (10/3)); // Distribute 10% reduction
        });
        
        // Normalize to ensure total is 100%
        const total = Object.values(results).reduce((a, b) => a + b, 0);
        Object.keys(results).forEach(key => {
          results[key] = Math.round((results[key] / total) * 100);
        });
        
        // Save to localStorage
        localStorage.setItem('pollResults2050', JSON.stringify(results));
        localStorage.setItem('musicPoll2050', option);
        
        // Update visual display
        updatePollResults(results);
        
        // Add visual feedback for selected option
        pollBtns.forEach(b => b.classList.remove('voted'));
        btn.classList.add('voted');
        
        // Show animation for poll results with GSAP
        if (typeof gsap !== 'undefined') {
          gsap.from('.result-bar', {
            width: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
          });
        }
      });
    });
    
    // If user already voted, highlight their choice
    if (localStorage.getItem('musicPoll2050')) {
      const userChoice = localStorage.getItem('musicPoll2050');
      const selectedBtn = document.querySelector(`.poll-btn[data-option="${userChoice}"]`);
      if (selectedBtn) {
        selectedBtn.classList.add('voted');
      }
    }
  }
  
  // Update Poll Results function
  function updatePollResults(results) {
    // Update each bar and percentage display
    Object.keys(results).forEach(key => {
      const bar = document.getElementById(`${key}-bar`);
      const percentage = document.getElementById(`${key}-percentage`);
      
      if (bar && percentage) {
        // Animate the bar width with GSAP if available
        if (typeof gsap !== 'undefined') {
          gsap.to(bar, {
            width: `${results[key]}%`,
            duration: 0.5,
            ease: "power1.out"
          });
        } else {
          // Fallback without GSAP
          bar.style.width = `${results[key]}%`;
        }
        
        // Update the percentage text
        percentage.textContent = `${Math.round(results[key])}%`;
      }
    });
  }
  
  // Hover Sound Effects - Only for timeline items
  function initHoverSounds() {
    // ONLY select timeline items for hover sounds
    const timelineItems = document.querySelectorAll('.year-item');
    const hoverSound = document.getElementById('hover-sound');
    
    if (!hoverSound || !timelineItems.length) return;
    
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Reset and play hover sound at lower volume
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.3;
        hoverSound.play().catch(e => console.log("Audio playback prevented:", e));
      });
    });
  }