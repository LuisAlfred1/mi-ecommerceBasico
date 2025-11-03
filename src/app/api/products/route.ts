import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const categorySlug = searchParams.get('category')
    
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(featured === 'true' && { isFeatured: true }),
        ...(categorySlug && { 
          category: { 
            slug: categorySlug 
          } 
        })
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}