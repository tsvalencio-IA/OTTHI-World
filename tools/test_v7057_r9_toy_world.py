#!/usr/bin/env python3
"""Compatibilidade: a revisão R9 foi substituída pela validação R10."""
from pathlib import Path
import subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
raise SystemExit(subprocess.run([sys.executable,str(ROOT/'tools/test_v7057_r10_visual_fidelity.py')],cwd=ROOT).returncode)
