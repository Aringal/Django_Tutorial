from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseBadRequest
from .models import ShoppingItem


# Create your views here.
def mylist(request):
    
    if request.method == "POST": # Daten emfangen vom frontend
        """Ankommende Einträge in SQL-Datenbank speichern
        """
        print("Receaved Data: ", request.POST["itemName"]) # Print in der Konsole
        ShoppingItem.objects.create(name = request.POST["itemName"]) # neuer Datenbankeintrag 
    
    all_items = ShoppingItem.objects.all() # alternativ: .get(id=1) oder  .filter(name="hallo")
    
    
    return render(request, "mylist/shopping_list.html", {"all_items": all_items}) # Liste an Renderaufruf mit pübergeben.


def delete_item(request, item_id):
    if request.method == 'POST':
        item_to_delete = get_object_or_404(ShoppingItem, id=item_id)
        item_to_delete.delete()
        return redirect('mylist') # Leitet zurück zur aktualisierten Liste
"""    else:
        # Wenn jemand versucht, die URL mit GET aufzurufen, können Sie etwas anderes tun
        return HttpResponseBadRequest("Nur POST-Anfragen erlaubt")"""
        
def check_item(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(ShoppingItem, id=item_id)
        item.done = not item.done  # Toggle the 'done' status
        item.save()
        return redirect('mylist') # Leitet zurück zur aktualisierten Liste
    else:
        return HttpResponseBadRequest("Nur POST-Anfragen sind für diese Operation erlaubt.")