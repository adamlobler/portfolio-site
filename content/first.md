---
title: ViddL
description: ViddL provides last-mile delivery service for big delivery companies. The startup has an admin UI for offices where they can manage the parcels and couriers and a mobile app for delivery.
tags: ["Web application", "Mobile application", "Package tracking"]
link: https://viddl.hu,
desktopImage: img/viddl_admin.png,
mobileImage: img/viddl_admin.png,
---

# Bevezetés

## Áttekintés

A ViddL-t 2017-ben alapították olyan fiatalok, akik úgy gondolták, változásra van szükség a csomagszállításban, jobb technológiai háttérrel az iparágat meg lehetne újítani, mivel ezen a területen kevés innováció történt az utóbbi években. Belevágtak és sok munkával elérték, hogy mára napi több ezer csomagot visznek ki Magyarország szerte.
A ViddL nagy logisztikai vállalatokkal szerződik le és az utolsó kilométeres kiszállítását végzik el csomagoknak gyalogos/biciklis futárok segítségével. A vállalatoktól reggelente több ezer csomag érkezik a ViddL depojába, majd a futárok egy mobil applikáció segítségével szállítanak a címekre, a címzetteket pedig egy több szintes rendszeren keresztül értesítik a kiszállításról. Mivel folyamatosan optimalizálják a csomagok útvonalát, képesek szinte percre pontosan megmondani, mikor érkezik a futár.

## Feladataim

Akkor kezdtem el dolgozni a ViddL-el amikor már készen volt a futár applikáció és a belsős admin rendszerük is, és ezek segítségével folyt már a kiszállítás. Startup vállalkozás révén a kezdeti rendszer egy minimális funkcionalitással és kissé esetlen megjelenéssel bíró MVP volt amivel a mindennapi kiszállítást meg tudta már oldani a vállalkozás komolyabb fennakadások nélkül.
Az én feladatom egyrészt az volt, hogy a ViddL rendszereinek megjelenését egységesítsem, hozzak létre egy olyan design systemet amit a fejlesztők könnyen tudnak implementálni. Másrészt pedig erre a design systemre alapozva, lépésről-lépésre tervezzem újra a ViddL alkalmazásait, hogy azok könnyebben használhatóak legyenek.

## Eredmény

A két éves együttműködésünk során sikerült felépíteni egy olyan egységes design system könyvtárat amit a későbbiekben a további fejlesztésekhez gyorsan és hatékonyan tudnak használni.
A csomagkövetési rendszert teljesen újraterveztük, aminek segítségével sokkal pontosabban lehet így értesíteni a csomagok érkezéséről a címzetteket.
A futárok mobilalkalmazása is egy teljes értékű modern felületet kapott ami jobban leköveti a kiszállítás menetét és egyszerűbb felhasználást biztosít a futárok számára.
Az admin felületet is új felhasználó központú megjelenést kapott, így egyszerűbben követhetik a napi kiszállítást a futárkoordinátorok, depo vezetők és a menedzsment is.

![building-nextjs-markdown-blog-post](img/viddl_admin.png)
