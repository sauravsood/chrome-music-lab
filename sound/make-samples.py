import os,subprocess,sys
flat=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]
sharp=["C","Cs","D","Ds","E","F","Fs","G","Gs","A","As","B"]
def midi(n,o): return (o+1)*12+n
def run(inst,src,lo,hi,dur):
    have={}
    for f in os.listdir(src):
        if f.endswith('.mp3'):
            nm=f[:-4]; n=sharp.index(nm[:-1]); o=int(nm[-1]); have[midi(n,o)]=os.path.join(src,f)
    out=f'sound/{inst}'; os.makedirs(out,exist_ok=True)
    for m in range(lo,hi+1):
        near=min(have,key=lambda k:(abs(k-m),k))
        ratio=2**((m-near)/12)
        name=flat[m%12]+str(m//12-1)
        af=[]
        if near!=m: af.append(f'asetrate={44100*ratio:.2f},aresample=44100')
        af.append(f'afade=t=out:st={dur-0.6}:d=0.6')
        subprocess.run(['ffmpeg','-loglevel','error','-y','-i',have[near],'-t',str(dur),'-af',','.join(af),'-ac','1','-b:a','96k',f'{out}/{name}.mp3'],check=True)
    print(inst,len(os.listdir(out)),'missing-shifted',sum(1 for m in range(lo,hi+1) if m not in have))
run('piano','samples/tonejs-instrument-piano-mp3-1.1.2/package',21,108,5)
run('harp','samples/tonejs-instrument-harp-mp3-1.1.1/package',48,90,4)
