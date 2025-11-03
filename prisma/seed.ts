import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Limpiar datos existentes (opcional)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Base de datos limpiada')

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electrónicos',
        slug: 'electronicos',
        description: 'Dispositivos electrónicos y accesorios',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Ropa',
        slug: 'ropa',
        description: 'Ropa y accesorios de moda',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Hogar',
        slug: 'hogar',
        description: 'Artículos para el hogar y decoración',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Deportes',
        slug: 'deportes',
        description: 'Equipamiento deportivo y fitness',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
      }
    })
  ])

  console.log(`✅ ${categories.length} categorías creadas`)

  // Crear productos
  const products = await Promise.all([
    // Electrónicos
    prisma.product.create({
      data: {
        name: 'Laptop Gaming Pro',
        slug: 'laptop-gaming-pro',
        description: 'Laptop de alto rendimiento con RTX 4060, 16GB RAM, SSD 512GB',
        price: 1299.99,
        comparePrice: 1499.99,
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'
        ],
        isActive: true,
        isFeatured: true,
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Auriculares Bluetooth',
        slug: 'auriculares-bluetooth',
        description: 'Auriculares inalámbricos con cancelación de ruido',
        price: 89.99,
        comparePrice: 129.99,
        stock: 50,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'
        ],
        isActive: true,
        isFeatured: true,
        categoryId: categories[0].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Mouse Gamer RGB',
        slug: 'mouse-gamer-rgb',
        description: 'Mouse ergonómico con iluminación RGB y 7 botones programables',
        price: 45.99,
        stock: 100,
        images: [
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'
        ],
        isActive: true,
        categoryId: categories[0].id
      }
    }),

    // Ropa
    prisma.product.create({
      data: {
        name: 'Camiseta Básica Premium',
        slug: 'camiseta-basica-premium',
        description: 'Camiseta de algodón 100% orgánico, disponible en varios colores',
        price: 24.99,
        stock: 200,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'
        ],
        isActive: true,
        categoryId: categories[1].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Jeans Slim Fit',
        slug: 'jeans-slim-fit',
        description: 'Jeans de mezclilla con corte moderno y ajuste perfecto',
        price: 59.99,
        comparePrice: 79.99,
        stock: 75,
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'
        ],
        isActive: true,
        isFeatured: true,
        categoryId: categories[1].id
      }
    }),

    // Hogar
    prisma.product.create({
      data: {
        name: 'Lámpara de Mesa LED',
        slug: 'lampara-mesa-led',
        description: 'Lámpara moderna con luz ajustable y puerto USB',
        price: 34.99,
        stock: 60,
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600'
        ],
        isActive: true,
        categoryId: categories[2].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Set de Cojines Decorativos',
        slug: 'set-cojines-decorativos',
        description: 'Pack de 4 cojines con diseños modernos para sala o habitación',
        price: 39.99,
        stock: 40,
        images: [
          'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600'
        ],
        isActive: true,
        categoryId: categories[2].id
      }
    }),

    // Deportes
    prisma.product.create({
      data: {
        name: 'Mancuernas Ajustables 20kg',
        slug: 'mancuernas-ajustables-20kg',
        description: 'Par de mancuernas con peso ajustable de 5 a 20kg cada una',
        price: 129.99,
        stock: 25,
        images: [
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600'
        ],
        isActive: true,
        isFeatured: true,
        categoryId: categories[3].id
      }
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Colchoneta antideslizante de 6mm con bolsa de transporte',
        price: 29.99,
        stock: 80,
        images: [
          'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'
        ],
        isActive: true,
        categoryId: categories[3].id
      }
    })
  ])

  console.log(`✅ ${products.length} productos creados`)

  // Crear un usuario de prueba
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Usuario de Prueba',
      password: 'hashed_password_here', // En producción usa bcrypt
      phone: '+502 1234-5678'
    }
  })

  console.log(`✅ Usuario de prueba creado: ${user.email}`)

  // Crear una dirección para el usuario
  const address = await prisma.address.create({
    data: {
      street: 'Zona 10, 5ta Avenida 12-34',
      city: 'Ciudad de Guatemala',
      state: 'Guatemala',
      zipCode: '01010',
      country: 'Guatemala',
      isDefault: true,
      userId: user.id
    }
  })

  console.log(`✅ Dirección creada para el usuario`)

  console.log('🎉 Seed completado exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })