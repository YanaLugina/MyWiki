# Для начала запомнить

Для чего нужен key: 
 - Если этот ключ и RuntimeType нового виджета равны ( == ) старому виджету, то он обновится (update), в противном случае старый виджет удаляется и элемент заполняет новый виджет;
 - Если key не определен, то сравниваются только RuntimeType и также при нахождении "одинаковых" виджетов происходит удаление старого виджета из дерева с последующим созданием на его месте нового, даже если у них разные children;
 - Если определен GlobalKey то можно перемещать виджеты по дереву элементов без потери состояния, то есть менять его предков-родителей;
 - Если у родительского элемента только один child то он (ребенок) не нуждается в явном key.