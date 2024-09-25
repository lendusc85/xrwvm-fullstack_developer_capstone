from django.contrib import admin
from .models import CarMake, CarModel


class CarModelInline(admin.TabularInline):
    model = CarModel
    extra = 1


class CarModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'year', 'car_make', 'price', 'fuel_type')
    list_filter = ('type', 'year', 'fuel_type')
    search_fields = ('name', 'car_make__name')


class CarMakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'country_of_origin', 'founded_year')
    search_fields = ('name', 'country_of_origin')
    inlines = [CarModelInline]


admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
