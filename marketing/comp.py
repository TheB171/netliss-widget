# Uso: python3 comp.py foto.jpg saida.jpg "linha branca" "linha verde" "sub 1|sub 2" "texto do botao" [feed|story]
import sys, os
from PIL import Image, ImageDraw, ImageFont
D=os.path.dirname(os.path.abspath(__file__)); F8=D+'/mont800.ttf'; LIME=(182,255,0)
src,out,l1,l2,sub,cta=sys.argv[1:7]; fmt=sys.argv[7] if len(sys.argv)>7 else 'feed'
W,H=(1080,1920) if fmt=='story' else (1080,1350)
icon0=Image.open(D+'/perfil.png').convert('RGBA').crop((245,225,847,825))
im=Image.open(src).convert('RGB'); s=max(W/im.width,H/im.height)
im=im.resize((int(im.width*s)+1,int(im.height*s)+1),Image.LANCZOS); im=im.crop(((im.width-W)//2,im.height-H,(im.width-W)//2+W,im.height))
g=Image.new('L',(1,H))
for y in range(H):
    t=0
    if y<H*0.40: t=int(250*min(1,(1-y/(H*0.40))*1.6)**1.1)
    if y>H*0.66: t=max(t,int(235*min(1,((y-H*0.66)/(H*0.22)))**1.3))
    g.putpixel((0,y),t)
im=Image.composite(Image.new('RGB',(W,H),(0,0,0)),im,g.resize((W,H))); d=ImageDraw.Draw(im); M=70
ic=icon0.copy(); m=Image.new('L',ic.size,0); ImageDraw.Draw(m).rounded_rectangle((0,0,ic.size[0]-1,ic.size[1]-1),radius=110,fill=255); ic.putalpha(m); ic=ic.resize((64,64),Image.LANCZOS)
im.paste(ic,(M,M),ic); d.text((M+80,M+12),"NETLISS",font=ImageFont.truetype(F8,34),fill=(255,255,255))
def wrap(t,f,mw):
    o=[];l=''
    for w in t.split():
        x=(l+' '+w).strip()
        if d.textlength(x,font=f)<=mw: l=x
        else: o.append(l); l=w
    return o+[l] if l else o
f=ImageFont.truetype(F8,92); y=M+120
for ln in wrap(l1,f,W-2*M): d.text((M,y),ln,font=f,fill=(255,255,255)); y+=104
for ln in wrap(l2,f,W-2*M): d.text((M,y),ln,font=f,fill=LIME); y+=104
fc=ImageFont.truetype(F8,46); tw=d.textlength(cta,font=fc); cy=H-M-92
subs=[x for x in sub.split('|') if x]; fs=ImageFont.truetype(D+'/mont700.ttf',40); y=cy-40-52*len(subs)
for ln in subs: d.text((M,y),ln,font=fs,fill=(240,240,240)); y+=52
d.rounded_rectangle((M,cy,M+tw+76,cy+92),radius=46,fill=LIME); d.text((M+38,cy+19),cta,font=fc,fill=(10,10,10))
im.save(out,quality=92); print(out)
