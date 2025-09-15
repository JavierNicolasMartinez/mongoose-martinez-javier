Colecciones a Utilizar:
User (Usuario): 
Achievement (Logro): 
Badge (Insignia): .
La colección Category la uso en Achievement para la relación 1:N.


1. Relación Uno a Muchos (1:N)
Colecciones: Category y Achievement.

Relación: Una Category puede tener muchos Achievements, pero cada Achievement pertenece a una sola Category.

Justificación: Se optó por un enfoque referenciado porque las categorías y los logros son entidades independientes. Un logro puede existir por sí mismo, y los detalles de una categoría (como su nombre o descripción) pueden cambiar sin necesidad de modificar todos los logros que le pertenecen. La referencia (category: { type: Schema.Types.ObjectId, ref: 'Category' }) evita la duplicación de datos y facilita la gestión de cada colección por separado. (Información también en material de classroom)

2. Relación Uno a Uno (1:1)
Colecciones: User y Achievement.

Relación: Un User tiene un uniqueAchievement y, a su vez, ese Achievement pertenece a un solo User.

Justificación: Se eligió un enfoque referenciado en ambos modelos (uniqueAchievement en User y earnedBy en Achievement). Aunque la relación es uno a uno, los datos de un logro (name, description, etc.) son significativos por sí mismos y podrían ser consultados de manera independiente. Referenciarlos permite consultar el logro sin necesidad de cargar todo el documento del usuario.

3. Relación Muchos a Muchos (N:M)
Colecciones: User y Badge.

Relación: Un User puede tener muchas Badges, y una Badge puede ser ganada por muchos Users.

Justificación: Esta relación siempre se maneja con referencias. Embeber los datos sería ineficiente y crearía duplicación masiva. Para un usuario, significaría tener una copia de todos los datos de las insignias que ganó. Para una insignia, significaría tener una lista de todos los usuarios, con sus datos completos. Ambas opciones son inviables. Referenciar Badges desde el User y Users desde la Badge permite consultas bidireccionales eficientes sin duplicar información.  (Nuevamente bien explicado en el material)

4. Propiedad Embebida
Colección: User (se agrega una propiedad profile).

Relación: La información del perfil está contenida dentro del documento de User.

Justificación: Se elige el enfoque embebido para datos que son dependientes y consultados junto con el documento principal. Un perfil básico (nombre, apellido, etc.) no tiene sentido sin un usuario al que pertenecer, y nunca sería consultado de forma independiente. Embeber estos datos evita una consulta adicional a la base de datos, mejorando el rendimiento para las operaciones de lectura más comunes.
Según el material mejora el rendimiento para datos relacionados.
