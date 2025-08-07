"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  X,
  AlertCircle,
  TrendingUp,
  User,
  Camera,
  History,
  Play,
  Square,
  RefreshCw,
  CheckCircle,
} from "lucide-react"
// Update the import path below if your Button component is located elsewhere, e.g.:
import { Button } from "@/components/ui/button"
// Or, if the correct path is different, adjust accordingly:
// import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
